const authController = require('../../controllers/authController');
const User = require('../../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const emailService = require('../../services/emailService');
const { JWT_SECRET } = require('../../config/jwt');
const { generateRandomString } = require('../../utils/helpers');

jest.mock('../../models/User');
jest.mock('bcryptjs');
jest.mock('jsonwebtoken');
jest.mock('../../services/emailService');
jest.mock('../../utils/helpers');

describe('Auth Controller', () => {
  let req, res, next;

  beforeEach(() => {
    req = { body: {}, header: jest.fn() };
    res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
    next = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('register creates new user', async () => {
    req.body = { email: 'test@example.com', password: 'password123', name: 'Test User', role: 'student', phone: '1234567890', organization: 'Test Org' };
    User.findOne.mockResolvedValue(null);
    bcrypt.hash.mockResolvedValue('hashedPassword');
    User.prototype.save = jest.fn().mockResolvedValue({ _id: '123', ...req.body });
    jwt.sign.mockReturnValue('token');

    await authController.register(req, res, next);

    expect(User.findOne).toHaveBeenCalledWith({ email: 'test@example.com' });
    expect(bcrypt.hash).toHaveBeenCalledWith('password123', 10);
    expect(User.prototype.save).toHaveBeenCalled();
    expect(jwt.sign).toHaveBeenCalledWith({ userId: '123', role: 'student' }, JWT_SECRET, { expiresIn: '1d' });
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
      message: 'User registered successfully',
      token: 'token',
      user: expect.objectContaining({ id: '123', email: 'test@example.com' })
    }));
  });

  test('register fails if email exists', async () => {
    req.body = { email: 'test@example.com', password: 'password123', name: 'Test User', role: 'student' };
    User.findOne.mockResolvedValue({ email: 'test@example.com' });

    await authController.register(req, res, next);

    expect(res.status).toHaveBeenCalledWith(409);
    expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ error: true, message: 'Email already exists', statusCode: 409 }));
  });

  test('login authenticates valid user', async () => {
    req.body = { email: 'test@example.com', password: 'password123' };
    User.findOne.mockResolvedValue({ _id: '123', email: 'test@example.com', password: 'hashedPassword', name: 'Test User', role: 'student' });
    bcrypt.compare.mockResolvedValue(true);
    jwt.sign.mockReturnValue('token');

    await authController.login(req, res, next);

    expect(User.findOne).toHaveBeenCalledWith({ email: 'test@example.com' });
    expect(bcrypt.compare).toHaveBeenCalledWith('password123', 'hashedPassword');
    expect(jwt.sign).toHaveBeenCalledWith({ userId: '123', role: 'student' }, JWT_SECRET, { expiresIn: '1d' });
    expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
      message: 'Login successful',
      token: 'token',
      user: expect.objectContaining({ id: '123', email: 'test@example.com' })
    }));
  });

  test('login fails with invalid credentials', async () => {
    req.body = { email: 'test@example.com', password: 'wrongpassword' };
    User.findOne.mockResolvedValue({ _id: '123', email: 'test@example.com', password: 'hashedPassword' });
    bcrypt.compare.mockResolvedValue(false);

    await authController.login(req, res, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ error: true, message: 'Invalid credentials', statusCode: 401 }));
  });

  test('forgotPassword sends reset email', async () => {
    req.body = { email: 'test@example.com' };
    User.findOne.mockResolvedValue({ _id: '123', email: 'test@example.com' });
    generateRandomString.mockReturnValue('resetToken');
    User.prototype.save = jest.fn().mockResolvedValue(true);
    emailService.sendPasswordResetEmail.mockResolvedValue();

    await authController.forgotPassword(req, res, next);

    expect(User.findOne).toHaveBeenCalledWith({ email: 'test@example.com' });
    expect(generateRandomString).toHaveBeenCalledWith(32);
    expect(emailService.sendPasswordResetEmail).toHaveBeenCalledWith('123', 'resetToken');
    expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ message: 'Password reset email sent' }));
  });

  test('resetPassword updates password', async () => {
    req.body = { token: 'resetToken', newPassword: 'newPassword123' };
    User.findOne.mockResolvedValue({ _id: '123', resetPasswordToken: 'resetToken', resetPasswordExpires: Date.now() + 3600000 });
    bcrypt.hash.mockResolvedValue('newHashedPassword');
    User.prototype.save = jest.fn().mockResolvedValue(true);

    await authController.resetPassword(req, res, next);

    expect(User.findOne).toHaveBeenCalledWith({ resetPasswordToken: 'resetToken', resetPasswordExpires: expect.any(Object) });
    expect(bcrypt.hash).toHaveBeenCalledWith('newPassword123', 10);
    expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ message: 'Password reset successfully' }));
  });

  test('verifyToken validates token', async () => {
    req.user = { userId: '123', role: 'student' };
    User.findById.mockResolvedValue({ _id: '123', name: 'Test User', email: 'test@example.com', role: 'student' });

    await authController.verifyToken(req, res, next);

    expect(User.findById).toHaveBeenCalledWith('123');
    expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ valid: true, user: expect.objectContaining({ id: '123' }) }));
  });
});