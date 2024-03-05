// import databaseConnection from "../../config/db.config.js";

import createDatabaseConnection from '../../config/db.config.js';
// databaseConnection

// const connection = await new databaseConnection()

export class MessageModel {
  async getAllMessages() {
    try {
      // await databaseConnection.createConnection();
			// const connection = databaseConnection.getConnection();
      const connection = await createDatabaseConnection();
			const [result] = await connection.query('SELECT * FROM messages;');
			return result;
		} catch (error) {
			console.log('mi error', error);
			return error.message
		}
	}
}
