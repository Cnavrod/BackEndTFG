import jwt from 'jsonwebtoken';
import User from '../models/user.js';
import { sendEmail } from '../../services/emailService.js';

export const register = async (req, res) => {
  try {
    const { username, email, password, role } = req.body;

    // Verificar que el rol es válido
    if (!['oyente', 'cantante'].includes(role)) {
      return res.status(400).json({ message: 'Invalid role' });
    }

    // Verificar que el email no esté en uso
    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      return res.status(400).json({ message: 'El correo ya está en uso' });
    }

    const user = new User({ username, email, password, role }); // <-- Incluye email
    const newUser = await user.save();

    // Enviar correo electrónico de bienvenida
    await sendEmail(
      newUser.email,
      'Welcome to Our Service',
      'Thank you for registering!',
      '<h1>Thank you for registering!</h1>'
    );

    res.status(201).json({ message: 'User registered', userId: newUser._id });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    // Generar el token JWT
    const token = jwt.sign(
      { id: user._id, username: user.username },
      process.env.SECRET_KEY,
      { expiresIn: '1h' }
    );
    res.json({ token, user: { id: user._id, username: user.username, role: user.role } });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}, '-password');
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Crear una nueva playlist
export const createPlaylist = async (req, res) => {
  try {
    const { name, isPublic } = req.body;
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    const newPlaylist = { name, songs: [], isPublic };
    user.playlists.push(newPlaylist);
    await user.save();

    res.status(201).json({ message: 'Playlist created', playlist: newPlaylist });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Añadir una canción a una playlist
export const addSongToPlaylist = async (req, res) => {
  try {
    const { playlistId, songId } = req.body;
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    const playlist = user.playlists.id(playlistId);
    if (!playlist) return res.status(404).json({ message: 'Playlist not found' });

    playlist.songs.push(songId);
    await user.save();

    res.status(200).json({ message: 'Song added to playlist', playlist });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Obtener playlists públicas
export const getPublicPlaylists = async (req, res) => {
  try {
    const users = await User.find({ 'playlists.isPublic': true }, 'playlists');
    const publicPlaylists = users.flatMap(user => user.playlists.filter(playlist => playlist.isPublic));
    res.json(publicPlaylists);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Obtener playlists de un usuario
export const getUserPlaylists = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate('playlists.songs');
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user.playlists);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
