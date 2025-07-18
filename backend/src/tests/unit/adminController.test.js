const adminController = require('../../controllers/adminController');
const User = require('../models/User');
const Event = require('../models/Event');

jest.mock('../models/User');
jest.mock('../models/Event');

describe('Admin Controller', () => {
    let req, res, next;

    beforeEach(() => {
        req = { body: {}, user: { userId: '123', role: 'admin' }, params: {} };
        res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
        next = jest.fn();
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    test('getAllUsers returns all users', async () => {
        User.find.mockResolvedValue([{ _id: '123', name: 'Test User' }]);

        await adminController.getAllUsers(req, res, next);

        expect(User.find).toHaveBeenCalled();
        expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ users: expect.any(Array) }));
    });

    test('updateEventStatus updates event status', async () => {
        req.params.id = '456';
        req.body = { status: 'upcoming' };
        Event.findById.mockResolvedValue({ _id: '456', status: 'ongoing', save: jest.fn().mockResolvedValue(true) });

        await adminController.updateEventStatus(req, res, next);

        expect(Event.findById).toHaveBeenCalledWith('456');
        expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ message: 'Event status updated' }));
    });
});