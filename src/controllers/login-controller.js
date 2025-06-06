import User from '../models/user.js';
import { sendEmail } from '../../services/emailService.js';
import crypto from 'crypto';

export const forgotPassword = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ username: email }) || await User.findOne({ email });
    if (!user) return res.status(404).json({ message: 'Usuario no encontrado.' });

    // Genera token y fecha de expiración
    const token = crypto.randomBytes(32).toString('hex');
    user.resetPasswordToken = token;
    user.resetPasswordExpires = Date.now() + 1000 * 60 * 60; // 1 hora
    await user.save();

    // Enlace de recuperación
    const resetUrl = `https://tfgcarlosnavarro.vercel.app/reset-password/${token}`;
    const subject = 'Recuperación de contraseña';
    const text = `Haz clic en el siguiente enlace para restablecer tu contraseña: ${resetUrl}`;
    const html = `<p>Haz clic en el siguiente enlace para restablecer tu contraseña:</p><a href="${resetUrl}">${resetUrl}</a>`;

    await sendEmail(user.email || user.username, subject, text, html);

    res.json({ message: 'Correo de recuperación enviado.' });
  } catch (error) {
    res.status(500).json({ message: 'Error enviando el correo de recuperación.' });
  }
};

export const resetPassword = async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;
  try {
    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() }
    });
    if (!user) return res.status(400).json({ message: 'Token inválido o expirado.' });

    user.password = password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();

    res.json({ message: 'Contraseña restablecida correctamente.' });
  } catch (error) {
    res.status(500).json({ message: 'Error al restablecer la contraseña.' });
  }
};
