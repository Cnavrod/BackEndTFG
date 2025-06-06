import mongoose from 'mongoose';

const commentSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'userscollections', required: true },
  username: { type: String, required: true },
  text: { type: String, required: true },
  date: { type: Date, default: Date.now }
});

const playlistSchema = new mongoose.Schema({
  name: { type: String, required: true },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'userscollections', required: true },
  songs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'songscollections' }],
  isPublic: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
  comments: [commentSchema] // <-- Añadido
});

const Playlist = mongoose.model('playlistscollections', playlistSchema);

export default Playlist;
