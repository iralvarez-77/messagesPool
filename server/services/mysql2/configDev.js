//patrón de diseño singleton , estableciendo una única conexión a la base de datos
import mysql from 'mysql2/promise';
import { config } from '../../helpers/index.js';
import { responseFn } from '../../helpers/index.js';


class MySQLDatabase {

  constructor() {
    this.connection = null
  }

  async connect() {
    try {
      if(!this.connection) {
        this.connection = await mysql.createConnection(config)
        console.log('Connected to the database');
      }
      return this.connection
      
    } catch (error) {
      console.log('👀 👉🏽 ~  errorConnectClass:', error)
    }
  }

  async disconnect() {
    try {
      if(this.connection) {
        await this.connection.end()
        console.log('Connection closed');
      } 
    } catch (error) {
      console.log('👀 👉🏽 ~  errorDisconnectClass:', error)
    }
  }

  async query(sql, values = []) {
    const connection = await this.connect();
    try {
      const [rows, _fields] = await connection.query(sql, values)
      return rows
    } catch (error) {
      console.log('👀 👉🏽 ~  errorQueryClass:', error)
      if (error.code === 'ER_DUP_ENTRY') return responseFn('El correo electrónico ya está registrado.', 409);
      return responseFn(error.message, 500);

    }
  }

}

export default new MySQLDatabase()
