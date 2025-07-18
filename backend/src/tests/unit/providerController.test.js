const providerController = require('../../controllers/providerController');
const Provider = require('../models/Provider');
const Event = require('../models/Event');
const { uploadProviderLogo } = require('../services/uploadService');

jest.mock('../models/Provider');
jest.mock('../models/Event');
jest.mock('../services/uploadService');

describe('Provider Controller', () => {
    let req, res, next;

    beforeEach(() => {
        req = { body: {}, user: { userId: '123', role: 'provider' }, params: {}, file: null };
        res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
        next = jest.fn();
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    test('createProviderProfile creates new profile', async () => {
        req.body = { name: 'Test Provider', description: 'Test Description' };
        uploadProviderLogo.mockResolvedValue('http://logo.url');
        Provider.prototype.save = jest.fn().mockResolvedValue({ _id: '456', user: '123', ...req.body });

        await providerController.createProviderProfile(req, res, next);

        expect(Provider.prototype.save).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ message: 'Provider profile created' }));
    });

    test('getProviderStats returns correct stats', async () => {
        Provider.findOne.mockResolvedValue({ _id: '456', user: '123' });
        Event.find.mockResolvedValue([
            { _id: '1', status: 'upcoming', participants: ['user1', 'user2'] },
            { _id: '2', status: 'expired', participants: ['user3'] }
        ]);

        await providerController.getProviderStats(req, res, next);

        expect(Provider.findOne).toHaveBeenCalledWith({ user: '123' });
        expect(Event.find).toHaveBeenCalledWith({ provider: '123' });
        expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
            totalEvents: 2,
            totalParticipants: 3,
            upcomingEvents: 1,
            completedEvents: 1
        }));
    });
});