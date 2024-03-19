import { CategoriesMessagesModel } from "../models/mysql/categories_messages.js";

export const create = async ( req, res ) => {
  const {data, statusCode} = await CategoriesMessagesModel.create(
    req.params.messageId,
    req.body.categoriesIds)
  res.status(statusCode).json(data)
}