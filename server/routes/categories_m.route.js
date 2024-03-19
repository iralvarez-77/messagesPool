import { Router } from "express";
import { create } from "../controllers/categories_m.controller.js";

const router = Router()

router.post('/:messageId/categories', create)



export default router