import SongsCollection from '../models/songs.js';
import User from '../models/user.js';

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

// Crear canción (solo cantantes)
export const createSong = async (req, res) => {
  try {
    // Solo cantantes pueden crear canciones
    if (req.user.role !== 'cantante') {
      return res.status(403).json({ message: 'Solo los cantantes pueden crear canciones.' });
    }

    const { title, duration, genre, year, collaborator } = req.body;

    // El artista principal es el usuario actual
    const artist = req.user.username;

    // Si hay colaborador, busca su nombre
    let collaboratorName = '';
    if (collaborator) {
      const collabUser = await User.findById(collaborator);
      if (!collabUser || collabUser.role !== 'cantante') {
        return res.status(400).json({ message: 'Colaborador inválido.' });
      }
      collaboratorName = collabUser.username;
    }

    // Guarda el nombre del artista y colaborador en el campo artist
    const artistField = collaboratorName ? `${artist} ft. ${collaboratorName}` : artist;

    const song = new SongsCollection({
      cover: '',
      title,
      artist: artistField,
      duration,
      genre,
      year,
      type: 'Single',
      popularity: 0,
      plays: 0,
      ratings: 0,
      listen: '',
    });

    await song.save();
    res.status(201).json(song);
  } catch (error) {
    console.error('Error al crear canción:', error);
    res.status(400).json({ message: error.message });
  }
};
