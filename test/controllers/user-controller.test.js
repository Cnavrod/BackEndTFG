import { register, login, getAllUsers } from '../../src/controllers/user-controller.js';
import User from '../../src/models/user.js';
import jwt from 'jsonwebtoken';

jest.mock('../../src/models/user.js');
jest.mock('jsonwebtoken');

describe('User Controller', () => {
  describe('register', () => {
    it('should register a new user', async () => {
      const req = { body: { username: 'testuser', password: 'testpass' } };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
      User.mockImplementation(() => ({
        save: jest.fn().mockResolvedValue({ _id: '123', username: 'testuser' }),
      }));

      await register(req, res);

      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({ message: 'User registered', userId: '123' });
    });
  });

  describe('login', () => {
    it('should login a user and return a token', async () => {
      const req = { body: { username: 'testuser', password: 'testpass' } };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
      User.findOne.mockResolvedValue({
        _id: '123',
        username: 'testuser',
        comparePassword: jest.fn().mockResolvedValue(true),
      });
      jwt.sign.mockReturnValue('token');

      await login(req, res);

      expect(res.json).toHaveBeenCalledWith({ token: 'token' });
    });
  });

  describe('getAllUsers', () => {
    it('should return all users', async () => {
      const req = {};
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
      User.find.mockResolvedValue([{ _id: '123', username: 'testuser' }]);

      await getAllUsers(req, res);

      expect(res.json).toHaveBeenCalledWith([{ _id: '123', username: 'testuser' }]);
    });
  });
});
