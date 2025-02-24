import mongoose from 'mongoose';
import { mongoDBConfig } from '../config.js';

export default async function connectUsers() {
  try {
    await mongoose.connect(`mongodb+srv://Carlos:${mongoDBConfig.PASS}@tfg.a12jv.mongodb.net/UsersDatabase?retryWrites=true&w=majority&appName=TFG`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Conectado a UsersDatabase en MongoDB');
  } catch (error) {
    console.error(`Error conectando a UsersDatabase: ${error.message}`);
    throw error;
  }
}
