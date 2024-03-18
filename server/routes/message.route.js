import { Router } from 'express';
import { createMessage, deleteMessage, getAllMessages, getMessageById, updateMessage } from '../controllers/message.controller.js';

const router = Router();

router.post('/', createMessage);
router.get('/', getAllMessages);
router.get('/:messageId', getMessageById);
router.put('/:messageId', updateMessage);
router.delete('/:messageId', deleteMessage);

export default router;
