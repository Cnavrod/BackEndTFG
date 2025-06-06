import parseQuery from '../../src/middlewares/query-middleware.js';

describe('Query Middleware', () => {
  it('should parse limit and offset', () => {
    const req = { query: { limit: '5', offset: '2', foo: 'bar' } };
    const res = {};
    const next = jest.fn();
    parseQuery(req, res, next);
    expect(req.query).toEqual({ limit: 5, offset: 2, foo: 'bar' });
    expect(next).toHaveBeenCalled();
  });

  it('should use default values if not provided', () => {
    const req = { query: {} };
    const res = {};
    const next = jest.fn();
    parseQuery(req, res, next);
    expect(req.query.limit).toBe(10);
    expect(req.query.offset).toBe(0);
    expect(next).toHaveBeenCalled();
  });
});
