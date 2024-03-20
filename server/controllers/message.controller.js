import { MessageModel } from '../models/mysql/messages.js';
import { CategoriesMessagesModel } from '../models/mysql/categories_messages.js';

export const getAllMessages = async (_req, res) => {
	const { data, statusCode } = await MessageModel.getAllMessages();
	res.status(statusCode).json(data);
};

export const getMessageById = async (req, res) => {
	const { data, statusCode } = await MessageModel.getMessageByID(
		req.params.messageId
	);
	res.status(statusCode).json(data);
};

export const createMessage = async (req, res) => {
		const data = await MessageModel.createMessage(
			req.body.content
		);
		res.status(data.statusCode).json(data);
};

export const updateMessage = async (req, res) => {
	const { data, statusCode } = await MessageModel.updateMessage(
		req.params.messageId,
		req.body.content
	);
	res.status(statusCode).json(data);
};

export const deleteMessage = async (req, res) => {
	const { data, statusCode } = await MessageModel.deleteMessage(
		req.params.messageId
	);
	res.status(statusCode).json(data);
};

export const createRelation = async ( req, res ) => {
  const {data, statusCode} = await CategoriesMessagesModel.createRelation(
    req.params.messageId,
    req.body.categoriesIds)
  res.status(statusCode).json(data)
}

export const getCategoriesByMessageId = async (req, res) => {
	const { data, statusCode } =  await CategoriesMessagesModel.getCategoriesByMessageId(
		req.params.messageId,
	)
	res.status(statusCode).json(data)
}
