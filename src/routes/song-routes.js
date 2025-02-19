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

router.get('/songs', getAllSongs);
router.get('/songs/title/:title', getSongByTitle);
router.get('/songs/genre/:genre', getSongsByGenre);
router.get('/songs/artist/:artist', getSongsByArtist);
router.get('/songs/year/:year', getSongsByYear);
router.post('/songs', createSong);
router.delete('/songs/title/:title', deleteSongByTitle);

export default router;
