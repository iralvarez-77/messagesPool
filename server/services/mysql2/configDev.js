//patrón de diseño singleton , estableciendo una única conexión a la base de datos
import mysql from 'mysql2/promise';

class DataBaseConnection {
	constructor() { 
		this.connection = null;
		this._createConnection() //encapsulando la lógica de conexión
	}
	//_método privado
	async  _createConnection() {
		try {
			this.connection = await mysql.createConnection({
				host: process.env.HOST_DB,
				port: process.env.PORT_MYSQL,
				password: process.env.PASSWORD_DB,
				user: process.env.USER_DB,
				database: process.env.NAME_DB,
			});

			console.log('Connected to the database');
			// console.log(this.connection);

		} catch (error) {
			console.error('Error connecting to the database:', error);
			throw new Error('Error en la conexión a la base de datos');
		}
	}

	getConnection() {
		if (!this.connection) {
			this.connection = new DataBaseConnection()
		}
		return this.connection;
	}

	async closeConnection() {
    if (this.connection) {
      await this.connection.end();
      console.log('Connection closed');
		
    }	
	}
}

const databaseConnection = new DataBaseConnection();
export default databaseConnection 
