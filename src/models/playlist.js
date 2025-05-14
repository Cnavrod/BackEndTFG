import mongoose from 'mongoose';

const playlistSchema = new mongoose.Schema({
  name: { type: String, required: true },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'userscollections', required: true },
  songs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'songscollections' }],
  isPublic: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});

const Playlist = mongoose.model('playlistscollections', playlistSchema);

export default Playlist;
