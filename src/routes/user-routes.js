import express from 'express';
import { register, login, getAllUsers } from '../controllers/user-controller.js';
import authMiddleware from '../middlewares/auth-middleware.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/', authMiddleware, getAllUsers);

export default router;
