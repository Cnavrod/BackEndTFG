import express from 'express';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import userRouter from '../routes/user-routes.js';
import songRouter from '../routes/song-routes.js';
import errorMiddleware from '../middlewares/error-middleware.js';
import morganMiddleware from '../config/morgan.js';
import swaggerDoc from '../openapi/index.js';
import playlistRouter from '../routes/playlist-routes.js';
import newsletterTemplateRouter from '../routes/newsletter-routes.js';

export default function (server) {
  /* Config */
  server.use(cors({
    origin: 'http://localhost:3001', // Cambia esto si el frontend está en otro dominio
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
  server.use('/api/newsletter-templates', newsletterTemplateRouter);
  server.use('/api/users', userRouter); // Asegúrate de que las rutas están bajo el prefijo /api
  server.use('/api/songs', songRouter); // Asegúrate de que las rutas están bajo el prefijo /api
  server.use('/api/playlists', playlistRouter);
  /* Error handler */
  server.use(errorMiddleware);
}
