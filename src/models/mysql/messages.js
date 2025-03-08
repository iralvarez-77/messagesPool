import { responseFn, getTotalPages, getOffSet } from '../../helpers/index.js';
import instanceDB from '../../services/mysql2/configDev.js';
import twilio from 'twilio';
import dayjs from 'dayjs';


const date = dayjs().format();

export class MessageModel {
	static async getAllMessages({ page, limit }) {
		try {
			const messages = await instanceDB.query(
				'SELECT * FROM messages LIMIT ?,?',
				[getOffSet(page, limit), limit]
			);
			if (messages.length === 0) throw new Error();

			const result = await instanceDB.query(
				'SELECT COUNT(*) AS total FROM messages'
			);
			const totalPages = getTotalPages(result[0].total, limit);

			const data = {
				messages,
				pagination: {
					page,
					limit,
					totalPages,
				},
			};

			return data;
		} catch (error) {
			console.log('👀 👉🏽 ~  error:', error);
			if (error.message === '') return responseFn([], 404);
			return responseFn(error.message, 500);
		}
	}



	static async getMessageByID(messageId) {
		try {
			const message = await instanceDB.query(
				'SELECT * FROM messages WHERE messageId = ?;',
				[messageId]
			);

			if (message.length === 0) throw new Error();

			return responseFn(message[0], 200);
		} catch (error) {
			console.log('👀 👉🏽 ~  error:', error.message);
			if (error.message === '') return responseFn('Message not found', 404);
			return responseFn(error.message, 500);
		}
	}

	static async createMessage(content) {
		try {
			const result = await instanceDB.query(
				'INSERT INTO messages(content, createdAt) VALUES (?, ?);',
				[content, date]
			);

			const data = {
				messageId: result.insertId,
				content,
			};

			return responseFn(data, 201);
		} catch (error) {
			console.log('👀 👉🏽 ~  error:', error);
			if (error.code === 'ER_DUP_ENTRY') return responseFn('El correo electrónico ya está registrado.', 409);
			return responseFn(error.message, 500);
		}
	}

	static async updateMessage(id, content) {
		try {
			const result = await instanceDB.query(
				'UPDATE messages SET content = ?, updatedAt = ? WHERE messageId = ?;',
				[content, date, id]
			);

			if (result.affectedRows === 0) throw new Error();

			const data = {
				messageId: id,
				content,
			};
			return responseFn(data, 200);
		} catch (error) {
			console.log('👀 👉🏽 ~  error:', error);
			if (error.message === '') return responseFn('message not found', 404);
			return responseFn(error.message, 500);
		}
	}

	static async deleteMessage(messageId) {
		try {
			const result = await instanceDB.query(
				'DELETE FROM messages WHERE messageId = ?;',
				[messageId]
			);

			if (result.affectedRows === 0) throw new Error();
			return responseFn('Message deleted successfully', 204);
		} catch (error) {
			console.log('👀 👉🏽 ~  error:', error);
			if (error.message === '') return responseFn('Message not found', 404);
			return responseFn(error.message, 500);
		}
	}

	static async sendMessage(content) {
		try {
		
			const client = twilio(process.env.ACCOUNT_SID, process.env.TOKEN_TWILIO);
	
			const { sid } = await client.messages
				.create({
					body: content,
					from: process.env.NUMBER_FROM,
					to: process.env.NUMBER_TO,
				})
	
			const data = {
				sid,
				message: 'Message is sent'
			}

			return responseFn(data, 200)
			
		} catch (error) {
			console.log('👀 👉🏽 ~  error:', error)
		}
	}
}
