import { CategoryModel } from "../models/mysql/categories.js";

export const createCategory = async (req, res) => {
  const newCategory = await CategoryModel.createCategory(req.body)
  res.status(201).json(newCategory)
}

export const getAllCategories = async (_req, res) => {
  const categories = await CategoryModel.getAllCategories()
  res.status(200).json(categories)
}

export const getCategory = async (req, res) => {
  const category = await CategoryModel.getCategory(req.params.categoryId)
  res.status(200).json(category)
}

export const updateCategory = async (req, res) => {
  const updatedCategory = await CategoryModel.updateCategory(
    req.params.categoryId,
    req.body
  )
  res.status(200).json(updatedCategory)
}
export const deleteCategory = async  (req, res) => {
  const deletedCategory = await CategoryModel.deleteCategory(req.params.categoryId)
  res.status(204).json(deletedCategory)
}