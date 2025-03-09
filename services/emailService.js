import formData from 'form-data';
import Mailgun from 'mailgun.js';

const mailgun = new Mailgun(formData);
const mg = mailgun.client({ username: 'api', key: process.env.MAILGUN_API_KEY });

export const sendEmail = async (to, subject, text, html) => {
  const data = {
    from: 'Excited User <mailgun@YOUR_DOMAIN_NAME>',
    to,
    subject,
    text,
    html,
  };

  try {
    const response = await mg.messages.create(process.env.MAILGUN_DOMAIN, data);
    console.log('Email sent:', response);
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
};
