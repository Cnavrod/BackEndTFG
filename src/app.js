import 'dotenv/config';
import express from 'express';
import init from './loaders/index.js';
import config from './config.js';
import connectMongo from '../services/connectionDB.js';
import connectUsers from '../services/connectionUsers.js';
import routes from './routes/index.js'; // Importa las rutas principales


const app = express();

init(app, config);
await connectMongo();

// Cargar las rutas principales bajo el prefijo /api
app.use('/api', routes);

export default app;
