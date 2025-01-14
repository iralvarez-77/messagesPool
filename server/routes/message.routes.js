import { Router } from 'express';
import { createMessage, deleteMessage, getAllMessages, getMessageById, updateMessage,createRelation, getCategoriesByMessageId, sendMessage } from '../controllers/messageControllers.js';

const router = Router();

router.post('/', createMessage);
router.get('/', getAllMessages);
router.get('/:messageId', getMessageById);
router.put('/:messageId', updateMessage);
router.delete('/:messageId', deleteMessage);
router.get('/:messageId/categories', getCategoriesByMessageId);
router.post('/:messageId/categories', createRelation)
router.post('/sendMessage', sendMessage)

export default router;
