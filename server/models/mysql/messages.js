import { responseFn } from '../../common/index.js';
import databaseConnection from '../../config/db.config.js';
import dayjs from 'dayjs';

let connection;

const date = dayjs().format();

export class MessageModel {
	static async getAllMessages() {
		try {
			connection = databaseConnection.getConnection();
			const [messages] = await connection.query('SELECT * FROM messages;');

			if (messages.length === 0) throw new Error()
			return responseFn(messages, 200)

		} catch (error) {
			console.log('👀 👉🏽 ~  error:', error);
			if (error.message === "") return responseFn([], 404)
			return responseFn(error.message, 500)
		}
	}

	static async getMessageByID(messageId) {
		try {
			connection = databaseConnection.getConnection();
			const [message] = await connection.query(
				'SELECT * FROM messages WHERE messageId = ?;',
				[messageId]
			);

			if (message.length === 0) throw new Error()
			
			return responseFn(message[0], 200)
			
		} catch (error) {
			console.log('👀 👉🏽 ~  error:', error.message);
			if (error.message === "") return responseFn('Message not found', 404)
			return responseFn(error.message, 500)
		}
	}

	static async createMessage(content) {
		try {
			connection = databaseConnection.getConnection();
			const [result] = await connection.query(
				'INSERT INTO messages(content, createdAt) VALUES (?, ?);',
				[content, date]
			);

			const data =  {
				messageId: result.insertId,
				content,
			}

			return responseFn(data, 201)

		} catch (error) {
			console.log('👀 👉🏽 ~  error:', error);
			if ( error.code === 'ER_DUP_ENTRY') return responseFn(error.message, 400)
			return responseFn(error.message, 500)
		}
	}

	static async updateMessage(id, content) {
		try {
			connection = await databaseConnection.getConnection();
			const [result] = await connection.query(
        'UPDATE messages SET content = ?, updatedAt = ? WHERE messageId = ?;',
        [content, date, id]
      )

			if (result.affectedRows === 0) throw new Error();
			
			const data = {
					messageId: id,
					content,
			};
			return responseFn(data, 200)
			
		} catch (error) {
			console.log('👀 👉🏽 ~  error:', error);
			if (error.message === "") return responseFn('message not found', 404)
			return responseFn(error.message, 500)
		}
	}

	static async deleteMessage(messageId) {
		try {
			connection = databaseConnection.getConnection();
			const [result] = await connection.query(
				'DELETE FROM messages WHERE messageId = ?;',
				[messageId]
			);

      if (result.affectedRows === 0 ) throw new Error()
			return responseFn('Message deleted successfully', 204)

		} catch (error) {
			console.log('👀 👉🏽 ~  error:', error);
			if (error.message === "") return responseFn('Message not found', 404)
			return responseFn(error.message, 500)
		}
	}
}
