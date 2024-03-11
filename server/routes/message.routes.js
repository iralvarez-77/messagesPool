import { Router } from 'express';
import { createMessage, deleteMessage, getAllMessages, getMessageById, updateMessage } from '../controllers/message.controllers.js';

const router = Router();

router.get('/', getAllMessages);
router.get('/:messageId', getMessageById);
router.post('/', createMessage);
router.put('/:messageId', updateMessage);
router.delete('/:messageId', deleteMessage);

export default router;
