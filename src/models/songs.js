import mongoose from 'mongoose';

const songSchema = new mongoose.Schema({
  cover: String,
  title: { type: String, required: true, unique: true },
  artist: String,
  genre: String,
  duration: String,
  year: Number,
  type: String,
  popularity: Number,
  plays: Number,
  ratings: Number,
  date: { type: Date, default: Date.now },
  listen: String,
});

const SongsCollection = mongoose.model('songscollections', songSchema);

export default SongsCollection;
