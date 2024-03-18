import { Router } from "express";
import { createCategory, deleteCategory, getAllCategories, getCategory, updateCategory } from "../controllers/category.controller.js";

const router = Router()

router.post('/', createCategory)
router.get('/', getAllCategories)
router.get('/:categoryId', getCategory)
router.put('/:categoryId', updateCategory)
router.delete('/:categoryId', deleteCategory)

export default router