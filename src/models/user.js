import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const playlistSchema = new mongoose.Schema({
  name: { type: String, required: true },
  songs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'songscollections' }], // Referencia a canciones
  isPublic: { type: Boolean, default: false }, // Pública o privada
});

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, required: true, enum: ['oyente', 'cantante'] },
  playlists: [playlistSchema], // Lista de playlists
});

// Hashea la contraseña antes de guardarla
userSchema.pre('save', async function preSave(next) {
  if (!this.isModified('password')) return next();
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (err) {
    next(err);
  }
});

// Método para comparar contraseñas
userSchema.methods.comparePassword = function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

const User = mongoose.model('userscollections', userSchema);
// Aqui "userscollections" es el nombre de la colección

export default User;
