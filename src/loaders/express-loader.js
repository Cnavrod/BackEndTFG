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
  server.use(cors({
    origin: ['http://localhost:3000', 'https://front-end-tfg.vercel.app', 'https://tfgcarlosnavarro.vercel.app'],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
  }));
  server.use(express.json());
  server.use(express.urlencoded({ extended: true }));
  server.use(express.static('public'));
  server.get('/docs', (req, res) => res.send(swaggerDoc));
  server.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc));
  server.use(morganMiddleware);
  server.use('/api/newsletter-templates', newsletterTemplateRouter);
  server.use('/api/users', userRouter);
  server.use('/api/songs', songRouter);
  server.use('/api/playlists', playlistRouter);
  server.use(errorMiddleware);
}
