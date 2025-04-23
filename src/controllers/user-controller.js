import jwt from 'jsonwebtoken';
import User from '../models/user.js';
import { sendEmail } from '../../services/emailService.js';

export const register = async (req, res) => {
  try {
    const { username, password, role } = req.body;

    // Verificar que el rol es válido
    if (!['oyente', 'cantante'].includes(role)) {
      return res.status(400).json({ message: 'Invalid role' });
    }

    const user = new User({ username, password, role });
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
    // Sign the JWT with the secret key from .env
    const token = jwt.sign(
      { id: user._id, username: user.username },
      process.env.SECRET_KEY,
      { expiresIn: '1h' }
    );
    res.json({ token });
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
