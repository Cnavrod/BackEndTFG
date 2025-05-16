import Subscriber from '../models/subscriber.js';
import NewsletterTemplate from '../models/newsletterTemplate.js';
import SongsCollection from '../models/songs.js';
import { sendEmail } from '../../services/emailService.js';

export const sendWeeklyNewsletter = async () => {
  try {
    const template = await NewsletterTemplate.findOne({ name: 'newsletter' });
    if (!template) {
      console.error('No newsletter template found.');
      return;
    }

    // Ejemplo: canciones recomendadas de la semana
    const recommendedSongs = await SongsCollection.find().limit(5);
    const songListText = recommendedSongs.map((song) => `- ${song.title} by ${song.artist}`).join('\n');
    const songListHtml = recommendedSongs.map((song) => `<li>${song.title} by ${song.artist}</li>`).join('');

    const subject = template.subject;
    const text = template.text.replace('{{songs}}', songListText);
    const html = template.html.replace('{{songs}}', songListHtml);

    const subscribers = await Subscriber.find();
    for (const sub of subscribers) {
      await sendEmail(sub.email, subject, text, html);
      console.log(`Newsletter sent to ${sub.email}`);
    }
  } catch (error) {
    console.error('Error sending weekly newsletter:', error);
  }
};
