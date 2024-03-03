import mysql from 'mysql2/promise';

// Create the connection to database
const createDatabaseConnection = async () => {
	try {
    const connection = await mysql.createConnection({
      host: process.env.HOST_DB,
			port: process.env.PORT_MYSQL,
			password: process.env.PASSWORD_DB,
			user: process.env.USER_DB,
			database: process.env.NAME_DB,
		});
    
		console.log('connected to the database')
    return connection

	} catch (error) {
    console.error('👀 👉🏽 ~  error connecting to the database:', error)
    throw error;
  }
};

export default createDatabaseConnection;
