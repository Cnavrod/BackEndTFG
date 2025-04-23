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
