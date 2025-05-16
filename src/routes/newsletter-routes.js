import express from 'express';
import {
  updateTemplate,
  getTemplates,
  createTemplate,
  subscribeToNewsletter // <-- Importa la función
} from '../controllers/newsletter-controller.js';


const router = express.Router();

router.post('/subscribe', subscribeToNewsletter); // <-- Añade esta línea
router.post('/', createTemplate);
router.put('/:name', updateTemplate);
router.get('/', getTemplates);

export default router;
