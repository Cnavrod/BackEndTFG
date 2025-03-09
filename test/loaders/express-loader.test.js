import expressLoader from '../../src/loaders/express-loader.js';
import express from 'express';

jest.mock('express', () => {
  const mExpress = {
    use: jest.fn(),
    get: jest.fn(),
    listen: jest.fn(),
  };
  return jest.fn(() => mExpress);
});

describe('Express Loader', () => {
  it('should configure express app', () => {
    const app = express();
    expressLoader(app);

    expect(app.use).toHaveBeenCalled();
    expect(app.get).toHaveBeenCalled();
  });
});
