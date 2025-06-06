import express from 'express';
import {
  createPlaylist,
  getUserPlaylists,
  getPublicPlaylists,
  addSongToPlaylist,
  deletePlaylist,
  addCommentToPlaylist,
  getPlaylistComments
} from '../controllers/playlist-controller.js';
import authMiddleware from '../middlewares/auth-middleware.js';

const router = express.Router();

router.post('/', authMiddleware, createPlaylist);
router.get('/mine', authMiddleware, getUserPlaylists);
router.get('/public', getPublicPlaylists);
router.post('/add-song', authMiddleware, addSongToPlaylist);
router.delete('/:playlistId', authMiddleware, deletePlaylist);

// Comentarios
router.post('/:playlistId/comments', authMiddleware, addCommentToPlaylist);
router.get('/:playlistId/comments', getPlaylistComments);

export default router;
