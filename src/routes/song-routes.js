import express from 'express';
import authMiddleware from '../middlewares/auth-middleware.js';
import {
  getAllSongs,
  getSongByTitle,
  getSongsByGenre,
  getSongsByArtist,
  getSongsByYear,
  createSong,
  deleteSongByTitle,
} from '../controllers/song-controller.js';

const router = express.Router();

router.get('/', getAllSongs);
router.get('/title/:title', getSongByTitle);
router.get('/genre/:genre', getSongsByGenre);
router.get('/artist/:artist', getSongsByArtist);
router.get('/year/:year', getSongsByYear);
router.delete('/title/:title', deleteSongByTitle);
router.post('/', authMiddleware, createSong);

export default router;
