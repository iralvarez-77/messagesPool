import { MessageModel } from '../models/mysql/messages.js'

const message = new MessageModel()

export const getAll = async (_req, res) => {
	try {
		const result = await message.getAllMessages()
		res.json(result)
	} catch (error) {
		console.log("controlador ",error);
		// res.json('gjh')
	}
}