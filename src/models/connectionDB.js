import mongoose from 'mongoose';
import { mongoDBConfig } from '../config.js';

export default async function connectMongo() {
  try {
    await mongoose.connect(`mongodb+srv://Carlos:${mongoDBConfig.PASS}@tfg.a12jv.mongodb.net/Songs?retryWrites=true&w=majority&appName=TFG`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Conectado a MongoDB');
  } catch (error) {
    console.error(`Error conectando a MongoDB: ${error.message}`);
    throw error;
  }
}
