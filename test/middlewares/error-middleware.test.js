import errorMiddleware from '../../src/middlewares/error-middleware.js';

describe('Error Middleware', () => {
  it('should send 500 and "Server Error" for generic errors', () => {
    const err = new Error('Test error');
    const req = {};
    const res = { status: jest.fn().mockReturnThis(), send: jest.fn() };
    const next = jest.fn();
    errorMiddleware(err, req, res, next);
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.send).toHaveBeenCalledWith({ status: 500, message: 'Server Error' });
  });

  it('should send custom status and message', () => {
    const err = { status: 404, message: 'Not found' };
    const req = {};
    const res = { status: jest.fn().mockReturnThis(), send: jest.fn() };
    const next = jest.fn();
    errorMiddleware(err, req, res, next);
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.send).toHaveBeenCalledWith({ status: 404, message: 'Not found' });
  });
});
