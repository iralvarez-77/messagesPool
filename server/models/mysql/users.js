import databaseConnection from '../../config/db.config.js'
import dayjs from 'dayjs'

let connection
const date = dayjs().format()
export class UserModel {

  static async createUser ({userName, alias}) {
    try {
      connection = databaseConnection.getConnection()
      const [result] = await connection.query(
        'INSERT INTO result(userName, alias, createdAt) VALUES(?,?,?);',
        [userName,alias, date]
      )
      console.log('👀 👉🏽 ~  result:', result)
      return result
    } catch (error) {
      console.log('👀 👉🏽 ~  error:', error)
      
    }
  }

  static async getAllUsers () {
    try {
      connection = databaseConnection.getConnection()
      const [ users ] = await connection.query(
        'SELECT * FROM users;'
      )
      return users
    } catch (error) {
      console.log('👀 👉🏽 ~  error:', error)
      
    }
  }
}