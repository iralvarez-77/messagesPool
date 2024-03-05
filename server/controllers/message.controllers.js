import { MessageModel } from '../models/mysql/messages.js'

const message = new MessageModel()

export const getAllMessages = async (_req, res) => {
	const {data, statusCode} = await message.getAllMessages()
	res.status(statusCode).json(data)
}

export const getMessageById =  async(req, res) => {
	const { messageId } = req.params
	const {data, statusCode} = await message.getMessageByID(messageId)
	res.status(statusCode).json(data)
}
