import { MessageModel } from '../models/mysql/messages.js';
import { CategoriesMessagesModel } from '../models/mysql/categoriesMessages.js';
import { stringToNumber } from '../helpers/index.js';

export const getAllMessages = async (req, res) => {
	try {
		const query = stringToNumber(req.query);
		const messages = await MessageModel.getAllMessages(query);
		res.status(200).json(messages);
	} catch (error) {
		console.log('👀 👉🏽 ~  errorgetAllMessages:', error)
		
	}
};

export const getMessageById = async (req, res) => {
	const message = await MessageModel.getMessageByID(req.params.messageId);
	res.status(message.statusCode).json(message);
};

export const createMessage = async (req, res) => {
	const newMessage = await MessageModel.createMessage(req.body.content);
	res.status(newMessage.statusCode).json(newMessage);
};

export const updateMessage = async (req, res) => {
	const updatedMessage = await MessageModel.updateMessage(
		req.params.messageId,
		req.body.content
	);
	res.status(updatedMessage.statusCode).json(updatedMessage);
};

export const deleteMessage = async (req, res) => {
	const deletedMessage = await MessageModel.deleteMessage(req.params.messageId);
	res.status(deletedMessage.statusCode).json(deletedMessage);
};

export const createRelation = async (req, res) => {
	const { data, statusCode } = await CategoriesMessagesModel.createRelation(
		req.params.messageId,
		req.body.categoriesIds
	);
	res.status(statusCode).json(data);
};

export const getCategoriesByMessageId = async (req, res) => {
	const { data, statusCode } =
		await CategoriesMessagesModel.getCategoriesByMessageId(req.params.messageId);
	res.status(statusCode).json(data);
};

export const sendMessage = async(req,res) => {
	console.log(req.body);
	const {statusCode, data} = await MessageModel.sendMessage(req.body)
	console.log('👀 👉🏽 ~  dataController:', data)
	res.status(statusCode).json(data)
}

