//patrón de diseño singleton , estableciendo una única conexión a la base de datos
import { createConnection } from 'mysql2/promise';
import { config } from '../../helpers/index.js';

class MySQLDatabase {
  //constructor debe ser privado 
  constructor() {
    //propiedad privada y debe ser estática
    this._connection = null
  }
  //método público y estático
  async connect() {
    try {
      if(!this._connection) {
        this._connection = await createConnection(config)
        console.log('Connected to the database');
      }
      return this._connection
      
    } catch (error) {
      console.log('👀 👉🏽 ~  errorConnectClass:', error)
    }
  }

  async disconnect() {
    try {
      if(this._connection) {
        await this._connection.end()
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
