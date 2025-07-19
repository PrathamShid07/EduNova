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
    req = { body: {}, header: jest.fn(), user: {}, headers: {} };
    res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
    next = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('register creates new user', async () => {
    req.body = {
      email: 'test@example.com',
      password: 'password123',
      name: 'Test User',
      role: 'student',
      phone: '1234567890',
      organization: 'Test Org'
    };

    User.findOne.mockResolvedValue(null);
    bcrypt.hash.mockResolvedValue('hashedPassword');

    User.mockImplementation(() => {
  return {
    _id: '123',
    role: 'student',
    save: jest.fn().mockResolvedValue({
      _id: '123',
      role: 'student',
      email: 'test@example.com',
      name: 'Test User',
      phone: '1234567890',
      organization: 'Test Org'
    })
  };
});

    jwt.sign.mockReturnValue('token');

    await authController.register(req, res, next);

    expect(User.findOne).toHaveBeenCalledWith({ email: 'test@example.com' });
    expect(bcrypt.hash).toHaveBeenCalledWith('password123', 10);
    expect(jwt.sign).toHaveBeenCalledWith({ userId: '123', role: 'student' }, JWT_SECRET, { expiresIn: '1d' });
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
      message: 'User registered successfully',
      token: 'token',
      user: expect.objectContaining({ id: '123', email: 'test@example.com' })
    }));
  });

  test('register fails if email exists', async () => {
    req.body = {
      email: 'test@example.com',
      password: 'password123',
      name: 'Test User',
      role: 'student'
    };

    User.findOne.mockResolvedValue({ email: 'test@example.com' });

    await authController.register(req, res, next);

    expect(res.status).toHaveBeenCalledWith(409);
    expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
      error: true,
      message: 'Email already exists',
      statusCode: 409
    }));
  });

  test('login authenticates valid user', async () => {
    req.body = {
      email: 'test@example.com',
      password: 'password123'
    };

    User.findOne.mockResolvedValue({
      _id: '123',
      email: 'test@example.com',
      password: 'hashedPassword',
      name: 'Test User',
      role: 'student',
      phone: '',
      organization: ''
    });

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
    req.body = {
      email: 'test@example.com',
      password: 'wrongpassword'
    };

    User.findOne.mockResolvedValue({
      _id: '123',
      email: 'test@example.com',
      password: 'hashedPassword'
    });

    bcrypt.compare.mockResolvedValue(false);

    await authController.login(req, res, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
      error: true,
      message: 'Invalid credentials',
      statusCode: 401
    }));
  });

  test('forgotPassword sends reset email', async () => {
    req.body = { email: 'test@example.com' };

    const mockUser = {
      _id: '123',
      email: 'test@example.com',
      save: jest.fn().mockResolvedValue(true)
    };

    User.findOne.mockResolvedValue(mockUser);
    generateRandomString.mockReturnValue('resetToken');
    emailService.sendPasswordResetEmail.mockResolvedValue();

    await authController.forgotPassword(req, res, next);

    expect(User.findOne).toHaveBeenCalledWith({ email: 'test@example.com' });
    expect(generateRandomString).toHaveBeenCalledWith(32);
    expect(emailService.sendPasswordResetEmail).toHaveBeenCalledWith('123', 'resetToken');
    expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ message: 'Password reset email sent' }));
  });

  test('resetPassword updates password', async () => {
    req.body = { token: 'resetToken', newPassword: 'newPassword123' };

    const mockUser = {
      _id: '123',
      resetPasswordToken: 'resetToken',
      resetPasswordExpires: Date.now() + 3600000,
      save: jest.fn().mockResolvedValue(true)
    };

    User.findOne.mockResolvedValue(mockUser);
    bcrypt.hash.mockResolvedValue('newHashedPassword');

    await authController.resetPassword(req, res, next);

    expect(User.findOne).toHaveBeenCalledWith({
      resetPasswordToken: 'resetToken',
      resetPasswordExpires: expect.any(Object)
    });

    expect(bcrypt.hash).toHaveBeenCalledWith('newPassword123', 10);
    expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ message: 'Password reset successfully' }));
  });

  test('verifyToken validates token', async () => {
    jwt.verify = jest.fn().mockReturnValue({ userId: '123' });

    req.user = { userId: '123' };

    const mockUser = {
      _id: '123',
      name: 'Test User',
      email: 'test@example.com',
      role: 'student',
      phone: '',
      organization: ''
    };

    const mockSelect = jest.fn().mockResolvedValue(mockUser);
    User.findById.mockReturnValue({ select: mockSelect });

    await authController.verifyToken(req, res, next);

    expect(User.findById).toHaveBeenCalledWith('123');
    expect(mockSelect).toHaveBeenCalledWith('-password');

    expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
      valid: true,
      user: expect.objectContaining({ id: '123' })
    }));
  });
});
