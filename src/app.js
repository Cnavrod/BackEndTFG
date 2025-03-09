import 'dotenv/config';
import express from 'express';
import init from './loaders/index.js';
import config from './config.js';
import connectMongo from '../services/connectionDB.js';
import connectUsers from '../services/connectionUsers.js';

const app = express();

init(app, config);
await connectMongo();

export default app;
