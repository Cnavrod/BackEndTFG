import { getAllSongs, getSongByTitle, getSongsByGenre, getSongsByArtist, getSongsByYear, createSong, deleteSongByTitle } from '../../src/controllers/song-controller.js';
import SongsCollection from '../../src/models/songs.js';

jest.mock('../../src/models/songs.js');

describe('Song Controller', () => {
  describe('getAllSongs', () => {
    it('should return all songs', async () => {
      const req = {};
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
      SongsCollection.find.mockResolvedValue([{ title: 'Test Song' }]);

      await getAllSongs(req, res);

      expect(res.json).toHaveBeenCalledWith([{ title: 'Test Song' }]);
    });

    it('should handle errors during fetching songs', async () => {
      const req = {};
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
      SongsCollection.find.mockRejectedValue(new Error('Fetch error'));

      await getAllSongs(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ message: 'Fetch error' });
    });
  });

  describe('getSongByTitle', () => {
    it('should return a song by title', async () => {
      const req = { params: { title: 'Test Song' } };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
      SongsCollection.findOne.mockResolvedValue({ title: 'Test Song' });

      await getSongByTitle(req, res);

      expect(res.json).toHaveBeenCalledWith({ title: 'Test Song' });
    });

    it('should handle song not found', async () => {
      const req = { params: { title: 'Nonexistent Song' } };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
      SongsCollection.findOne.mockResolvedValue(null);

      await getSongByTitle(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: 'Song not found' });
    });

    it('should handle errors during fetching song by title', async () => {
      const req = { params: { title: 'Test Song' } };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
      SongsCollection.findOne.mockRejectedValue(new Error('Fetch error'));

      await getSongByTitle(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ message: 'Fetch error' });
    });
  });
});

describe('getSongsByGenre', () => {
  it('should return songs by genre', async () => {
    const req = { params: { genre: 'Pop' } };
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
    SongsCollection.find.mockResolvedValue([{ title: 'Song1', genre: 'Pop' }]);
    await getSongsByGenre(req, res);
    expect(res.json).toHaveBeenCalledWith([{ title: 'Song1', genre: 'Pop' }]);
  });

  it('should handle errors', async () => {
    const req = { params: { genre: 'Pop' } };
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
    SongsCollection.find.mockRejectedValue(new Error('Genre error'));
    await getSongsByGenre(req, res);
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ message: 'Genre error' });
  });
});

describe('getSongsByArtist', () => {
  it('should return songs by artist', async () => {
    const req = { params: { artist: 'Artist1' } };
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
    SongsCollection.find.mockResolvedValue([{ title: 'Song1', artist: 'Artist1' }]);
    await getSongsByArtist(req, res);
    expect(res.json).toHaveBeenCalledWith([{ title: 'Song1', artist: 'Artist1' }]);
  });
});

describe('getSongsByYear', () => {
  it('should return songs by year', async () => {
    const req = { params: { year: 2021 } };
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
    SongsCollection.find.mockResolvedValue([{ title: 'Song1', year: 2021 }]);
    await getSongsByYear(req, res);
    expect(res.json).toHaveBeenCalledWith([{ title: 'Song1', year: 2021 }]);
  });
});
