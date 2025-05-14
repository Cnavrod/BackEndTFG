import Playlist from '../models/playlist.js';

// Crear playlist
export const createPlaylist = async (req, res) => {
  try {
    const { name, isPublic } = req.body;
    const playlist = new Playlist({
      name,
      owner: req.user.id,
      isPublic: isPublic || false,
      songs: []
    });
    await playlist.save();
    res.status(201).json(playlist);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Obtener playlists del usuario autenticado
export const getUserPlaylists = async (req, res) => {
  try {
    const playlists = await Playlist.find({ owner: req.user.id }).populate('songs');
    res.json(playlists);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Obtener playlists públicas
export const getPublicPlaylists = async (req, res) => {
  try {
    const playlists = await Playlist.find({ isPublic: true }).populate('owner', 'username').populate('songs');
    res.json(playlists);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Añadir canción a playlist
export const addSongToPlaylist = async (req, res) => {
  try {
    const { playlistId, songId } = req.body;
    const playlist = await Playlist.findOne({ _id: playlistId, owner: req.user.id });
    if (!playlist) return res.status(404).json({ message: 'Playlist not found' });
    if (!playlist.songs.includes(songId)) {
      playlist.songs.push(songId);
      await playlist.save();
    }
    res.json(playlist);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Eliminar una playlist del usuario
export const deletePlaylist = async (req, res) => {
  try {
    const { playlistId } = req.params;
    const playlist = await Playlist.findOneAndDelete({ _id: playlistId, owner: req.user.id });
    if (!playlist) return res.status(404).json({ message: 'Playlist not found' });
    res.json({ message: 'Playlist deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
