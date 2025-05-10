import express from 'express';
import { register, login, getAllUsers } from '../controllers/user-controller.js';
import { createPlaylist, addSongToPlaylist, getPublicPlaylists, getUserPlaylists } from '../controllers/user-controller.js';
import authMiddleware from '../middlewares/auth-middleware.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/', authMiddleware, getAllUsers);
router.post('/playlists', authMiddleware, createPlaylist); // Crear playlist
router.post('/playlists/add-song', authMiddleware, addSongToPlaylist); // Añadir canción a playlist
router.get('/playlists/public', getPublicPlaylists); // Obtener playlists públicas
router.get('/playlists', authMiddleware, getUserPlaylists); // Obtener playlists del usuario


export default router;
