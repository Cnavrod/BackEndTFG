import express from 'express';
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
router.post('/', createSong);
router.delete('/title/:title', deleteSongByTitle);

export default router;
