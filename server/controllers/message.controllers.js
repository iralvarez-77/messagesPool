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
	const { messageId } = req.params
	const { content } = req.body
	// const {data,statusCode} = await MessageModel.updateMessage()
	const result = await MessageModel.updateMessage(messageId, content)
	console.log('👀 👉🏽 ~  result:', result)
	// res.status(statusCode).json(data)
	res.json(result)
}

export const deleteMessage = async (req, res) => {
	const { data , statusCode } = await MessageModel.deleteMessage(
		req.params.messageId
	)
	res.status(statusCode).json(data)
}
