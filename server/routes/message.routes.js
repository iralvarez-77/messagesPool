import { Router } from 'express';
import { getAll } from '../controllers/message.controllers.js';

const router = Router();

router.get('/', getAll);

export default router;
