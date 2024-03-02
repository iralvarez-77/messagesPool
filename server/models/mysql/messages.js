import mysql from 'mysql2/promise';

// Create the connection to database
const connection = await mysql.createConnection({
	host: 'localhost',
	// port: 3306,
	// password: '01234567',
	user: 'root',
	database: 'pool_messages',
});

class MessageModel {
	async getAll() {
		try {
			const result = await connection.query('SELECT * FROM messages;');
		} catch (error) {}
	}
}
