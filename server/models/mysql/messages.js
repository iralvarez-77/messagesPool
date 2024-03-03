import createDatabaseConnection from '../../config/db.config.js'

const connection = await createDatabaseConnection()

export class MessageModel {
  async getAllMessages() {
    try {
      const [result] = await connection.query('SELECT * FROM messages;');
      return result;
    } catch (error) {
      console.log('mi error', error);
      return error.message
    }
	}
}