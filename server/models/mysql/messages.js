import databaseConnection from '../../config/db.config.js';
let connection

export class MessageModel {
	async getAllMessages() {
		try {
			connection = databaseConnection.getConnection();
			const [result] = await connection.query('SELECT * FROM messages;');
			return result;
		} catch (error) {
			return error.message;
		} finally {
      await databaseConnection.closeConnection()
		}
	}
	async getMessageByID() {
		try {
			// await databaseConnection.createConnection();
			// const connection = databaseConnection.getConnection();
			// const connection = await createDatabaseConnection();
			const [result] = await connection.query('SELECT * FROM messages;');
			return result;
		} catch (error) {
			return error.message;
		}
	}
}
