import { responseFn, getTotalPages, getOffSet } from '../../helpers/index.js';
import instanceDB from '../../services/mysql2/configDev.js';
import dayjs from 'dayjs';

let connection;

const date = dayjs().format();

export class MessageModel {
	static async getAllMessages({ page, limit }) {
		try {
			connection = instanceDB.getConnection();
			const offset = getOffSet(page, limit);

			const [messages] = await connection.query(
				'SELECT * FROM messages LIMIT ?,?',
				[offset, limit]
			);
			if (messages.length === 0) throw new Error();

			const [result] = await connection.query(
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

			return responseFn(data, 200);
		} catch (error) {
			console.log('👀 👉🏽 ~  error:', error);
			if (error.message === '') return responseFn([], 404);
			return responseFn(error.message, 500);
		}
	}

	static async getMessageByID(messageId) {
		try {
			connection = instanceDB.getConnection();
			const [message] = await connection.query(
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
			connection = instanceDB.getConnection();
			const [result] = await connection.query(
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
			if (error.code === 'ER_DUP_ENTRY') return responseFn(error.message, 409);
			return responseFn(error.message, 500);
		}
	}

	static async updateMessage(id, content) {
		try {
			connection = await instanceDB.getConnection();
			const [result] = await connection.query(
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
			connection = instanceDB.getConnection();
			const [result] = await connection.query(
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
}
