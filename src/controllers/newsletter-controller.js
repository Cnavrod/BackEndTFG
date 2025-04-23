import Subscriber from '../models/subscriber.js';
import { sendEmail } from '../../services/emailService.js';
import SongsCollection from '../models/songs.js';

export const subscribeToNewsletter = async (req, res) => {
  try {
    const { email } = req.body;

    // Verificar si ya está suscrito
    const existingSubscriber = await Subscriber.findOne({ email });
    if (existingSubscriber) {
      return res.status(400).json({ message: 'You are already subscribed to the newsletter.' });
    }

    // Guardar el suscriptor en la base de datos
    const newSubscriber = new Subscriber({ email });
    await newSubscriber.save();

    // Obtener canciones recomendadas
    const recommendedSongs = await SongsCollection.find().limit(3); // Cambia el límite según lo que desees
    const songList = recommendedSongs.map((song) => `- ${song.title} by ${song.artist}`).join('\n');

    // Enviar correo de agradecimiento
    const subject = 'Thank you for subscribing to our newsletter!';
    const text = `Hi there!\n\nThank you for subscribing to our newsletter. Here are some song recommendations for you:\n\n${songList}\n\nEnjoy!`;
    const html = `
      <h1>Thank you for subscribing to our newsletter!</h1>
      <p>Here are some song recommendations for you:</p>
      <ul>
        ${recommendedSongs.map((song) => `<li>${song.title} by ${song.artist}</li>`).join('')}
      </ul>
      <p>Enjoy!</p>
    `;

    await sendEmail(email, subject, text, html);

    res.status(201).json({ message: 'Subscription successful. A welcome email has been sent.' });
  } catch (error) {
    console.error('Error subscribing to newsletter:', error.message);
    res.status(500).json({ message: 'An error occurred while subscribing to the newsletter.' });
  }
};
