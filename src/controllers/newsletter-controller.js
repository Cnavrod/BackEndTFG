import Subscriber from '../models/subscriber.js';
import NewsletterTemplate from '../models/newsletterTemplate.js';
import { sendEmail } from '../../services/emailService.js';
import SongsCollection from '../models/songs.js';

// Crear plantilla
export const createTemplate = async (req, res) => {
  try {
    const { name, subject, text, html } = req.body;
    const template = new NewsletterTemplate({ name, subject, text, html });
    await template.save();
    res.status(201).json(template);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Editar plantilla
export const updateTemplate = async (req, res) => {
  try {
    const { name } = req.params;
    const { subject, text, html } = req.body;
    const template = await NewsletterTemplate.findOneAndUpdate(
      { name },
      { subject, text, html },
      { new: true }
    );
    if (!template) return res.status(404).json({ message: 'Template not found' });
    res.json(template);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Obtener todas las plantillas
export const getTemplates = async (req, res) => {
  try {
    const templates = await NewsletterTemplate.find();
    res.json(templates);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const subscribeToNewsletter = async (req, res) => {
  try {
    const { email } = req.body;
    // Verifica si ya está suscrito
    const existing = await Subscriber.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: 'Ya estás suscrito a la newsletter.' });
    }
    // Guarda el suscriptor
    const newSubscriber = new Subscriber({ email });
    await newSubscriber.save();

    // Obtén la plantilla por defecto
    const template = await NewsletterTemplate.findOne({ name: 'default' });
    if (!template) {
      return res.status(500).json({ message: 'No hay plantilla de newsletter configurada.' });
    }

    // Canciones recomendadas aleatorias
    const recommendedSongs = await SongsCollection.aggregate([{ $sample: { size: 3 } }]);
    const songListText = recommendedSongs.map((song) => `- ${song.title} by ${song.artist}`).join('\n');
    const songListHtml = recommendedSongs.map((song) => `<li>${song.title} by ${song.artist}</li>`).join('');

    // Personaliza la plantilla
    const subject = template.subject;
    const text = template.text.replace('{{songs}}', songListText);
    const html = template.html.replace('{{songs}}', songListHtml);

    await sendEmail(email, subject, text, html);

    res.status(201).json({ message: 'Suscripción exitosa. Revisa tu correo.' });
  } catch (error) {
    res.status(500).json({ message: 'Error al suscribirse a la newsletter.' });
  }
};
