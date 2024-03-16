import { returnFn } from '../../common/index.js';
import databaseConnection from '../../config/db.config.js';

let connection;

export class MessageModel {
	static async getAllMessages() {
		try {
			connection = databaseConnection.getConnection();
			const [result] = await connection.query('SELECT * FROM messages;');

			return returnFn(result, 200)

		} catch (error) {
			console.log('👀 👉🏽 ~  error:', error);
			return returnFn(error.message, 500)
		}
	}

	static async getMessageByID(messageId) {
		try {
			connection = databaseConnection.getConnection();
			const [result] = await connection.query(
				'SELECT * FROM messages WHERE messageId = ?;',
				[messageId]
			);

			if (result.length === 0) throw new Error()
			
			return returnFn(result[0], 200)
			
		} catch (error) {
			console.log('👀 👉🏽 ~  error:', error.message);
			if (error.message === "") return returnFn('Message not found', 404)
			return returnFn(error.message, 500)
		}
	}

	static async createMessage(content) {
		try {
			connection = databaseConnection.getConnection();
			const [result] = await connection.query(
				'INSERT INTO messages(content) VALUES (?);',
				[content]
			);

			const data =  {
				messageId: result.insertId,
				content,
			}

			return returnFn(data, 201)

		} catch (error) {
			console.log('👀 👉🏽 ~  error:', error);
			if ( error.code === 'ER_DUP_ENTRY') return returnFn(error.message, 400)
			return returnFn(error.message, 500)
		}
	}

	static async updateMessage(id, content) {
		try {
			connection = await databaseConnection.getConnection();
			const [result] = await connection.query(
        'UPDATE messages SET content = ?  WHERE messageId = ?;',
        [content, id]
      )

			if (result.insertId === 0) throw new Error();
			
			const data = {
					messageId: id,
					content,
			};
			return returnFn(data, 200)
			
		} catch (error) {
			console.log('👀 👉🏽 ~  error:', error);
			if (error.message === "") return returnFn('message not found', 404)
			return returnFn(error.message, 500)
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
			return returnFn('No content', 204)

		} catch (error) {
			console.log('👀 👉🏽 ~  error:', error);
			if (error.message === "") return returnFn('Message not found', 404)
			return returnFn(error.message, 500)
		}
	}
}
