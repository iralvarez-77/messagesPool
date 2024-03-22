import { Router } from "express";
import { createRelation, createUser, deleteUser, getAllUsers, getMessagesByUserId, getUser, updateUser } from "../controllers/userControllers.js";

const router = Router()

router.post('/', createUser)
router.get('/', getAllUsers)
router.get('/:userId', getUser)
router.put('/:userId', updateUser)
router.delete('/:userId', deleteUser)
router.get('/:userId/messages', getMessagesByUserId)
router.post('/:userId/messages', createRelation)

export default router