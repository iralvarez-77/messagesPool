import { stringToNumber } from '../helpers/index.js';
import { CategoryModel } from '../models/mysql/categories.js';
import { CategoriesMessagesModel } from '../models/mysql/categoriesMessages.js';

export const createCategory = async (req, res) => {
	const newCategory = await CategoryModel.createCategory(req.body);
	res.status(newCategory.statusCode).json(newCategory);
};
export const getAllCategories = async (req, res) => {
	const query = stringToNumber(req.query);
	const categories = await CategoryModel.getAllCategories(query);
	res.status(categories.statusCode).json(categories);
};
export const getCategory = async (req, res) => {
	const category = await CategoryModel.getCategory(req.params.categoryId);
	res.status(category.statusCode).json(category);
};
export const updateCategory = async (req, res) => {
	const updatedCategory = await CategoryModel.updateCategory(
		req.params.categoryId,
		req.body
	);
	res.status(updatedCategory.statusCode).json(updatedCategory);
};
export const deleteCategory = async (req, res) => {
	const deletedCategory = await CategoryModel.deleteCategory(
		req.params.categoryId
	);
	res.status(deletedCategory.statusCode).json(deletedCategory);
};

export const getMessagesByCategoryId = async (req, res) => {
	const data = await CategoriesMessagesModel.getMessagesByCategoryId(
		req.params.categoryId
	);
	res.status(200).json(data);
};
