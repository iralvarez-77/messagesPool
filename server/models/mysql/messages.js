import { returnFn } from '../../common/index.js';
import databaseConnection from '../../config/db.config.js';

let connection;

export class MessageModel {
	static async getAllMessages() {
		try {
			connection = databaseConnection.getConnection();
			const [result] = await connection.query('SELECT * FROM messages;');

			//TODO: Refactorizar esta parte
			return returnFn(result, 200)

		} catch (error) {
			console.log('👀 👉🏽 ~  error:', error.message);

			return {
				data: 'Internal Server Error',
				statusCode: 500,
			};
		}
	}

	static async getMessageByID(messageId) {
		try {
			connection = databaseConnection.getConnection();
			const [result] = await connection.query(
				'SELECT * FROM messages WHERE messageId = ?;',
				[messageId]
			);

			if (result.length === 0)
				returnFn('Resourse not found', 404)
			
			return returnFn(result[0], 200)
			
		} catch (error) {
			console.log('👀 👉🏽 ~  error:', error.message);

			return {
				data: 'Internal Server Error',
				statusCode: 500,
			};
		}
	}

	static async createMessage(content) {
		try {
			connection = databaseConnection.getConnection();
			const [result] = await connection.query(
				'INSERT INTO messages(content) VALUES (?);',
				[content]
			);
			console.log('👀 👉🏽 ~  result:', result)

			const data =  {
				messageId: result.insertId,
				content,
			}

			return returnFn(data, 200)

		} catch (error) {
			console.log('👀 👉🏽 ~  error:', error);
			(error.code === 'ER_DUP_ENTRY') 
				? return returnFn('El mensaje ya existe.', 400)
				: return returnFn('Internal server error', 500)
		}
	}

	static async updateMessage(id, content) {
		try {
			connection = await databaseConnection.getConnection();
			await connection.query(
        'UPDATE messages SET content = ?  WHERE messageId = ?;',
        [content, id]
      )
			const data = {
				data: {
					messageId: id,
					content,
				}
			};
			return returnFn(data, 200 )
    
		} catch (error) {
			console.log('👀 👉🏽 ~  error:', error);
        return {
          data: 'Internal Server Error',
          statusCode: 500,
        }
		}
	}

	static async deleteMessage(messageId) {
		try {
			connection = databaseConnection.getConnection();
			const [result] = await connection.query(
				'DELETE FROM messages WHERE messageId = ?;',
				[messageId]
			);

      if (result.affectedRows === 0 ) 
        return {
          data: 'Message not found',
          statusCode: 404
        }

      return {
        data: 'No content',
        statusCode: 204
      }
		} catch (error) {
			console.log('👀 👉🏽 ~  error:', error);
      return {
				data: 'Internal Server Error',
				statusCode: 500,
			};
		}
	}
}
