import databaseConnection from '../../config/db.config.js'
import dayjs from 'dayjs'

let connection
const date = dayjs().format()
export class UserModel {

  static async createUser ({userName, alias}) {
    try {
      connection = databaseConnection.getConnection()
      const [users] = await connection.query(
        'INSERT INTO users(userName, alias, createdAt) VALUES(?,?,?);',
        [userName,alias, date]
      )
      console.log('👀 👉🏽 ~  users:', users)
      return users
    } catch (error) {
      console.log('👀 👉🏽 ~  error:', error)
      
    }
  }


}