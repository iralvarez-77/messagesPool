import mysql from 'mysql2/promise';

const createDatabaseConnection = async () => {
	try {
    const connection = await mysql.createConnection({
      host: process.env.HOST_DB,
			port: process.env.PORT_MYSQL,
			password: process.env.PASSWORD_DB,
			user: process.env.USER_DB,
			database: process.env.NAME_DB,
		});
    throw 'hola';
		console.log('connected to the database')
    // return connection

	} catch (error) {
    console.error('👀 👉🏽 ~  error connecting to the database:', error)
		throw new Error('Error en la conexión a la base de datos');
  }
};

export default createDatabaseConnection;


// class DatabaseConnection {
//   constructor() {
//     this.connection = null;
//   }

//   async createConnection() {
//     try {
//       this.connection = await mysql.createConnection({
//         host: process.env.HOST_DB,
//         port: process.env.PORT_MYSQL,
//         password: process.env.PASSWORD_DB,
//         user: process.env.USER_DB,
//         database: process.env.NAME_DB,
//       });
// 			throw 'hola'
//       console.log('Connected to the database');
//     } catch (error) {
//       console.error('Error connecting to the database:', error);
//       throw new Error('Error en la conexión a la base de datos');
//     }
//   }

//   getConnection() {
//     if (!this.connection) {
//       throw new Error('La conexión a la base de datos no ha sido establecida.');
//     }
//     return this.connection;
//   }
// }

// const databaseConnection = new DatabaseConnection();
// export default databaseConnection;
