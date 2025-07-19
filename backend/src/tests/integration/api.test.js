const request = require('supertest');
const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('../../routes/auth');
const userRoutes = require('../../routes/users');
const eventRoutes = require('../../routes/events');
const providerRoutes = require('../../routes/providers');
const contactRoutes = require('../../routes/contacts');
const notificationRoutes = require('../../routes/notifications');
const adminRoutes = require('../../routes/admin');
const uploadRoutes = require('../../routes/upload');
const healthRoutes = require('../../routes/health');

const app = express();
app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/providers', providerRoutes);
app.use('/api/contacts', contactRoutes);
app.use('/api/notifications', notificationRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/api/health', healthRoutes);

jest.mock('../../services/emailService', () => ({
  sendContactEmail: jest.fn().mockResolvedValue(true)
}));

describe('API Integration Tests', () => {
  let token, userId, eventId, providerId;

  beforeAll(async () => {
    // DB connection handled in global setup.js
  });

  afterAll(async () => {
    // DB disconnect handled in global teardown
  });

  test('POST /api/auth/register creates a new user', async () => {
    const response = await request(app)
      .post('/api/auth/register')
      .send({
        email: 'newuser@example.com',
        password: 'password123',
        name: 'New User',
        role: 'student'
      });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('token');
    expect(response.body.user).toHaveProperty('email', 'newuser@example.com');
    token = response.body.token;
    userId = response.body.user.id;
  });

  test('POST /api/auth/login authenticates user', async () => {
    const response = await request(app)
      .post('/api/auth/login')
      .send({ email: 'newuser@example.com', password: 'password123' });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('token');
  });

  test('GET /api/users/profile requires authentication', async () => {
    const response = await request(app).get('/api/users/profile');

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty('message', 'Unauthorized: No token provided');
  });

  test('POST /api/events creates event for provider', async () => {
    const providerResponse = await request(app)
      .post('/api/auth/register')
      .send({
        email: 'provider@example.com',
        password: 'password123',
        name: 'Provider',
        role: 'provider'
      });
    const providerToken = providerResponse.body.token;

    const response = await request(app)
      .post('/api/events')
      .set('Authorization', `Bearer ${providerToken}`)
      .send({
        title: 'Test Event',
        description: 'Test',
        category: 'webinar',
        startDate: '2025-07-20T10:00:00Z',
        endDate: '2025-07-21T10:00:00Z', // ✅ Required by validation
        location: 'Online'
      });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('event');
    eventId = response.body.event._id;
  });

  test('POST /api/users/favorites/:eventId adds event to favorites', async () => {
    const response = await request(app)
      .post(`/api/users/favorites/${eventId}`)
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('message', 'Event added to favorites');
  });

  test('POST /api/providers creates provider profile', async () => {
    const providerResponse = await request(app)
      .post('/api/auth/register')
      .send({
        email: 'provider2@example.com',
        password: 'password123',
        name: 'Provider2',
        role: 'provider'
      });
    const providerToken = providerResponse.body.token;

    const response = await request(app)
      .post('/api/providers')
      .set('Authorization', `Bearer ${providerToken}`)
      .send({
        name: 'Test Provider',
        description: 'Test Description'
      });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('provider');
    providerId = response.body.provider._id;
  });

  test('POST /api/contacts sends message to provider', async () => {
    const response = await request(app)
      .post('/api/contacts')
      .set('Authorization', `Bearer ${token}`)
      .send({
        providerId,
        subject: 'Test Subject',
        message: 'Test Message'
      });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('contact');
  });

  test('POST /api/notifications/preferences updates preferences', async () => {
    const response = await request(app)
      .post('/api/notifications/preferences')
      .set('Authorization', `Bearer ${token}`)
      .send({
        emailNotifications: true,
        pushNotifications: true,
        eventReminders: true
      });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('preferences');
  });

  test('GET /api/health returns OK status', async () => {
    const response = await request(app).get('/api/health');

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('message', 'Server is healthy'); // ✅ Updated to match your controller
  });
});
