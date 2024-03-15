import { MessageModel } from '../models/mysql/messages.js';

export const getAllMessages = async (_req, res) => {
	const { data, statusCode } = await MessageModel.getAllMessages();
	res.status(statusCode).json(data);
};

export const getMessageById = async (req, res) => {
	const { data, statusCode } = await MessageModel.getMessageByID(req.params.messageId,);
	res.status(statusCode).json(data);
};

export const createMessage = async (req, res) => {
	
	const data = await MessageModel.createMessage(
		req.body.content
	);
	console.log('👀 👉🏽 ~  data:', data)

	res.status(200).json(data.code);
	// res.status(statusCode).json(data);
};

export const updateMessage = async (req,res) => {
	const { data,statusCode } = await MessageModel.updateMessage(
		req.params.messageId,
		req.body.content
	)
	res.status(statusCode).json({
		messageId: data.messageId,
		content: data.content,
	});
}

export const deleteMessage = async (req, res) => {
	const { data , statusCode } = await MessageModel.deleteMessage(
		req.params.messageId
	)
	res.status(statusCode).json(data)
}
