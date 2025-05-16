import mongoose from 'mongoose';

const newsletterTemplateSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  subject: { type: String, required: true },
  text: { type: String, required: true }, // Puede contener {{songs}}
  html: { type: String, required: true }, // Puede contener {{songs}}
});

const NewsletterTemplate = mongoose.model('newslettertemplates', newsletterTemplateSchema);

export default NewsletterTemplate;
