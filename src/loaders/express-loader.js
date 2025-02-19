import express from 'express';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import songRouter from '../routes/song-routes.js';
import errorMiddleware from '../middlewares/error-middleware.js';
import morganMiddleware from '../config/morgan.js';
import swaggerDoc from '../openapi/index.js';

export default function (server) {
  /* Config */
  server.use(cors({
    origin: 'https://carlosnavarrotfg.vercel.app',
    methods: ['GET', 'POST', 'OPTIONS', 'PUT', 'DELETE'],
    allowedHeaders: ['Authorization', 'Content-Type'],
    credentials: true,
  }));
  server.use(express.json());
  server.use(express.urlencoded({ extended: true }));
  /* Static files */
  server.use(express.static('public'));
  /* Swagger */
  server.get('/docs', (req, res) => res.send(swaggerDoc));
  server.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc));
  /* MDW */
  server.use(morganMiddleware);
  /* Routes */
  server.use('/api', songRouter); // Asegúrate de que las rutas están bajo el prefijo /api
  /* Error handler */
  server.use(errorMiddleware);
}
