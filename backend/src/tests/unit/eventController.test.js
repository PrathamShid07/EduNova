const eventController = require('../../controllers/eventController');
const Event = require('../../models/Event');
const { uploadEventImage } = require('../../services/uploadService');

jest.mock('../../models/Event');
jest.mock('../../services/uploadService');

describe('Event Controller', () => {
    let req, res, next;

    beforeEach(() => {
        req = { body: {}, user: { userId: '123', role: 'provider' }, query: {}, params: {}, file: null };
        res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
        next = jest.fn();
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    test('createEvent creates new event for provider', async () => {
        req.body = {
            title: 'Test Event',
            description: 'Test Description',
            category: 'webinar',
            startDate: '2025-07-20T10:00:00Z',
            location: 'Online',
            maxParticipants: 100
        };
        uploadEventImage.mockResolvedValue('http://image.url');
        Event.prototype.save = jest.fn().mockResolvedValue({ _id: '456', ...req.body, provider: '123' });

        await eventController.createEvent(req, res, next);

        expect(Event.prototype.save).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ message: 'Event created successfully', event: expect.any(Object) }));
    });

    test('getEvents filters by category and paginates', async () => {
        req.query = { category: 'webinar', page: 1, limit: 10 };
        Event.find.mockReturnValue({
            populate: jest.fn().mockReturnValue({
                skip: jest.fn().mockReturnValue({
                    limit: jest.fn().mockResolvedValue([{ _id: '456', title: 'Test Event' }])
                })
            })
        });
        Event.countDocuments.mockResolvedValue(1);

        await eventController.getEvents(req, res, next);

        expect(Event.find).toHaveBeenCalledWith({ category: 'webinar' });
        expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ events: expect.any(Array), pagination: expect.any(Object) }));
    });

    test('registerForEvent adds user to participants', async () => {
        req.params.id = '456';
        Event.findById.mockResolvedValue({ _id: '456', participants: [], maxParticipants: 100, save: jest.fn() });

        await eventController.registerForEvent(req, res, next);

        expect(Event.findById).toHaveBeenCalledWith('456');
        expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ message: 'Registered for event successfully' }));
    });
});