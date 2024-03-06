import { Router } from 'express';
import { createMessage, getAllMessages, getMessageById } from '../controllers/message.controllers.js';

const router = Router();

router.get('/', getAllMessages);
router.get('/:messageId', getMessageById);
router.post('/', createMessage);

export default router;
