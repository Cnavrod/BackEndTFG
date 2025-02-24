import express from 'express';
import { register, login } from '../controllers/user-controller.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/', authMiddleware, getAllUsers);

export default router;
