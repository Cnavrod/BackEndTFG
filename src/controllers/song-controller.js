import SongsCollection from '../models/songs.js';

// Obtener todas las canciones
export const getAllSongs = async (req, res) => {
  try {
    const songs = await SongsCollection.find();
    console.log('Songs retrieved:', songs); // Mensaje de depuración
    res.json(songs);
  } catch (error) {
    console.error('Error retrieving songs:', error.message); // Mensaje de depuración
    res.status(500).json({ message: error.message });
  }
};

// Obtener una canción por título
export const getSongByTitle = async (req, res) => {
  try {
    const song = await SongsCollection.findOne({ title: req.params.title });
    if (!song) return res.status(404).json({ message: 'Song not found' });
    res.json(song);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Obtener canciones por género
export const getSongsByGenre = async (req, res) => {
  try {
    const songs = await SongsCollection.find({ genre: req.params.genre });
    res.json(songs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Obtener canciones por artista
export const getSongsByArtist = async (req, res) => {
  try {
    const songs = await SongsCollection.find({ artist: req.params.artist });
    res.json(songs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Obtener canciones por año
export const getSongsByYear = async (req, res) => {
  try {
    const songs = await SongsCollection.find({ year: req.params.year });
    res.json(songs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Insertar una nueva canción
export const createSong = async (req, res) => {
  const song = new SongsCollection(req.body);
  try {
    const newSong = await song.save();
    res.status(201).json(newSong);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Borrar una canción por título
export const deleteSongByTitle = async (req, res) => {
  try {
    const song = await SongsCollection.findOneAndDelete({ title: req.params.title });
    if (!song) return res.status(404).json({ message: 'Song not found' });
    res.json({ message: 'Song deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
