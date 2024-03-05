import { Router } from 'express';
import { getAllMessages, getMessageById } from '../controllers/message.controllers.js';

const router = Router();

router.get('/', getAllMessages);
router.get('/:messageId', getMessageById);

export default router;
