import instanceDB from '../../services/mysql2/configDev.js';
import { responseFn } from '../../helpers/index.js';


export class UserMessagesModel {
	static async createRelation(userId, messagesIds) {
		try {
			let data = [];
			for (const messageId of messagesIds) {
				const result = await instanceDB.query(
					'INSERT INTO users_messages(userId, messageId) VALUES(?,?)',
					[userId, messageId]
				);

				data.push({
					id: result.insertId,
					userId,
					messageId,
				});
			}

			return responseFn(data, 201);
		} catch (error) {
			console.log('👀 👉🏽 ~  error:', error);
			if (error.message === 'ER_DUP_ENTRY')
				return responseFn('Relational already exists', 409);
			return responseFn(error.message, 500);
		}
	}
	static async getMessagesByUserId(userId) {
		try {
			const messages = await instanceDB.query(
				`SELECT u.userId, userName, content
          FROM messages m
          INNER JOIN users_messages um ON m.messageId = um.messageId
          INNER JOIN users u ON um.userId = u.userId
          WHERE u.userId = ?`,
				[userId]
			);
			if (messages.length === 0) throw new Error();
			return responseFn(messages, 200);
		} catch (error) {
			console.log('👀 👉🏽 ~  error:', error);
			if (error.message === '') return responseFn([], 404);
			return responseFn(error.message, 500);
		}
	}
}
