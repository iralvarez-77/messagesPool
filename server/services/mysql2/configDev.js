//patrón de diseño singleton , estableciendo una única conexión a la base de datos
import mysql from 'mysql2/promise';
import { config } from '../../helpers/index.js';

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
      const [rows, fields] = await connection.query(sql, values)
      return rows
    } catch (error) {
      console.log('👀 👉🏽 ~  errorQueryClass:', error)
			throw error
    }
  }

}

export default new MySQLDatabase()
