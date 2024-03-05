import databaseConnection from '../../config/db.config.js';

let connection;

export class MessageModel {
	async getAllMessages() {
		try {

			connection = databaseConnection.getConnection();
			const [result] = await connection.query('SELECT * FROM messages;');
			console.log('👀 👉🏽 ~  result:', result);

			return {
				data: result,
				statusCode: 200,
			};

		} catch (error) {
			console.log('👀 👉🏽 ~  error:', error.message);

			return {
				data: 'Internal Server Error',
				statusCode: 500,
			};
		}
	}

	async getMessageByID(messageId) {
		try {
			connection = databaseConnection.getConnection();
			const [result] = await connection.query(
				'SELECT * FROM messages WHERE messageId = ?;',
				[messageId]
			);

      if ( result.length === 0 )
        return {
          data:'Resourse not found',
          statusCode: 404
        }

      return {
				data: result[0],
				statusCode: 200,
			};

		} catch (error) {
			console.log('👀 👉🏽 ~  error:', error.message);

      return {
				data: 'Internal Server Error',
				statusCode: 500,
			};
		}
	}
}
