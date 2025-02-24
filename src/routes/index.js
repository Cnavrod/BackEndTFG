// import express from 'express';
// import { login } from '../controllers/login-controller.js';
// import miscRouter from './misc-router.js';

// const router = express.Router();

// router.post('/login', login);

// router.use(miscRouter);

// export default router;
import express from 'express';
import userRouter from './user-routes.js';
import songRouter from './song-routes.js';
import authMiddleware from '../middlewares/auth-middleware.js';

const router = express.Router();

// Rutas públicas
router.use('/users', userRouter); // /users/register y /users/login

// Rutas protegidas (requieren token)
router.use('/songs', authMiddleware, songRouter);

export default router;
