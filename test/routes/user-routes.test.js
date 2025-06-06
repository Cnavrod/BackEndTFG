import request from 'supertest';
import app from '../../src/app.js';
import User from '../../src/models/user.js';
import jwt from 'jsonwebtoken';

jest.mock('../../src/models/user.js');
jest.mock('jsonwebtoken');

describe('User Routes', () => {
  describe('POST /api/users/register', () => {
    it('should register a new user', async () => {
      User.mockImplementation(() => ({
        save: jest.fn().mockResolvedValue({ _id: '123', username: 'testuser' }),
      }));

      const res = await request(app)
        .post('/api/users/register')
        .send({ username: 'testuser', password: 'testpass' });

      expect(res.status).toBe(201);
      expect(res.body).toEqual({ message: 'User registered', userId: '123' });
    });
  });

  describe('POST /api/users/login', () => {
    it('should login a user and return a token', async () => {
      User.findOne.mockResolvedValue({
        _id: '123',
        username: 'testuser',
        comparePassword: jest.fn().mockResolvedValue(true),
      });
      jwt.sign.mockReturnValue('token');

      const res = await request(app)
        .post('/api/users/login')
        .send({ username: 'testuser', password: 'testpass' });

      expect(res.status).toBe(200);
      expect(res.body).toEqual({ token: 'token' });
    });
  });

  describe('GET /api/users', () => {
    it('should return all users', async () => {
      User.find.mockResolvedValue([{ _id: '123', username: 'testuser' }]);
      jwt.verify.mockReturnValue({ id: '123' });

      const res = await request(app)
        .get('/api/users')
        .set('Authorization', 'Bearer token');

      expect(res.status).toBe(200);
      expect(res.body).toEqual([{ _id: '123', username: 'testuser' }]);
    });
  });
});

  describe('GET /api/users', () => {
    it('should return 401 if no token is provided', async () => {
      const res = await request(app)
        .get('/api/users');
      expect(res.status).toBe(401);
      expect(res.body).toEqual({ message: 'No token provided' });
    });

    it('should return 401 if token is invalid', async () => {
      jwt.verify.mockImplementation(() => { throw new Error('Invalid token'); });
      const res = await request(app)
        .get('/api/users')
        .set('Authorization', 'Bearer invalidtoken');
      expect(res.status).toBe(401);
      expect(res.body).toEqual({ message: 'Invalid token' });
    });
  });
