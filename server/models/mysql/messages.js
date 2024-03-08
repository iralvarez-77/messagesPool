import databaseConnection from '../../config/db.config.js';

let connection;

export class MessageModel {
	static async getAllMessages() {
		try {

			connection = databaseConnection.getConnection();
			const [result] = await connection.query('SELECT * FROM messages;');

      //TODO: Refactorizar esta parte
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

	static async getMessageByID(messageId) {
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

  static async createMessage (content) {
    try {
      connection = databaseConnection.getConnection()
      const [result] = await connection.query(
        'INSERT INTO messages(content) VALUES (?);',
        [content]
      )
      return {
        data: {
          messageId: result.insertId,
          content
        },
        statusCode: 200
      }
    } catch(error) {
      console.log('👀 👉🏽 ~  error:', error)
      return {
        data: 'Internal Server Error',
        statusCode: 500,
      }
    }
  }

  static async updateMessage (id, body) {
    try {
      
    } catch (error) {
      console.log('👀 👉🏽 ~  error:', error)
      // return {
      //   data: 'Internal Server Error',
      //   statusCode: 500,
      // }
    }
  }
}
