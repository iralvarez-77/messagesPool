import { MessageModel } from '../models/mysql/messages.js';

export const getAllMessages = async (_req, res) => {
	const { data, statusCode } = await MessageModel.getAllMessages();
	res.status(statusCode).json(data);
};

export const getMessageById = async (req, res) => {
	const { messageId } = req.params;
	const { data, statusCode } = await MessageModel.getMessageByID(messageId);
	res.status(statusCode).json(data);
};

export const createMessage = async (req, res) => {
	const { data, statusCode } = await MessageModel.createMessage(
		req.body.content
	);
	res.status(statusCode).json({
		messageId: data.messageId,
		content: data.content,
	});
};

export const updateMessage = async (req,res) => {
	const { idMessage } = req.params
	const { content } = req.body
	res.status().json()
}
