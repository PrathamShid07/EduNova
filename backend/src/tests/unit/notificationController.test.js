// tests/unit/notificationController.test.js
const notificationController = require('../../controllers/notificationController');
const Notification = require('../../models/Notification');
const notificationService = require('../../services/notificationService');
const User = require('../../models/User');

jest.mock('../../models/Notification');
jest.mock('../../services/notificationService');
jest.mock('../../models/User');

describe('Notification Controller', () => {
  let req, res, next;

  beforeEach(() => {
    req = { body: {}, user: { userId: '123', role: 'provider' }, params: {}, query: {} };
    res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
    next = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('createNotification creates new notification', async () => {
    req.body = { userId: '456', message: 'Test Notification', type: 'general' };
    Notification.prototype.save = jest.fn().mockResolvedValue({ _id: '789', ...req.body });
    notificationService.sendPushNotification.mockResolvedValue();

    await notificationController.createNotification(req, res, next);

    expect(Notification.prototype.save).toHaveBeenCalled();
    expect(notificationService.sendPushNotification).toHaveBeenCalledWith('456', 'Test Notification');
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ message: 'Notification created' }));
  });

  test('updateNotificationPreferences updates preferences', async () => {
    req.body = { emailNotifications: true, pushNotifications: true, eventReminders: true };
    const mockUser = {
      _id: '123',
      notificationPreferences: {},
      save: jest.fn().mockResolvedValue(true)
    };
    User.findById.mockResolvedValue(mockUser);

    await notificationController.updateNotificationPreferences(req, res, next);

    expect(User.findById).toHaveBeenCalledWith('123');
    expect(mockUser.notificationPreferences).toEqual({
      emailNotifications: true,
      pushNotifications: true,
      eventReminders: true
    });
    expect(mockUser.save).toHaveBeenCalled();
    expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ message: 'Notification preferences updated' }));
  });
});
