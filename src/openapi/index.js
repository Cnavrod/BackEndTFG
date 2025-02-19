// import yaml from 'js-yaml';
// import { readFileSync } from 'fs';
// import { dirname, resolve } from 'path';
// import { fileURLToPath } from 'url';

import express from 'express';
// import { login } from '../controllers/login-controller.js';
// import miscRouter from '../routes/misc-router.js';
import songRouter from '../routes/song-routes.js';

const router = express.Router();

// router.post('/login', login);
// router.use(miscRouter);
router.use(songRouter);

export default router;
