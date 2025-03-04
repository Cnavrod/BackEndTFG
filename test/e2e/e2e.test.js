import request from 'supertest';
import app from '../../src/app.js';

describe('E2E Tests', () => {
  let token;

  beforeAll(async () => {
    await request(app)
      .post('/api/users/register')
      .send({ username: 'e2euser', password: 'e2epass' });

    const res = await request(app)
      .post('/api/users/login')
      .send({ username: 'e2euser', password: 'e2epass' });

    token = res.body.token;
  });

  it('should get all users', async () => {
    const res = await request(app)
      .get('/api/users')
      .set('Authorization', `Bearer ${token}`);

    expect(res.status).toBe(200);
    expect(res.body).toEqual(expect.arrayContaining([
      expect.objectContaining({ username: 'e2euser' }),
    ]));
  });

  it('should create and retrieve a song', async () => {
    const song = {
      cover: '/path/to/cover.jpg',
      title: 'Test Song',
      artist: 'Test Artist',
      genre: 'Test Genre',
      duration: '3:30',
      year: 2021,
      type: 'Single',
      popularity: 10,
      plays: 100,
      ratings: 5,
      date: '2021-01-01',
      listen: 'http://example.com',
    };

    const createRes = await request(app)
      .post('/api/songs')
      .set('Authorization', `Bearer ${token}`)
      .send(song);

    expect(createRes.status).toBe(201);
    expect(createRes.body).toEqual(expect.objectContaining(song));

    const getRes = await request(app)
      .get(`/api/songs/title/${song.title}`)
      .set('Authorization', `Bearer ${token}`);

    expect(getRes.status).toBe(200);
    expect(getRes.body).toEqual(expect.objectContaining(song));
  });
});
