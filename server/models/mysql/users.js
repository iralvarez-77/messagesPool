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

  static async getUser (userId) {
    try {
      connection = databaseConnection.getConnection()
      const [user] = await connection.query(
        'SELECT * FROM users WHERE userId = ?;',
        [userId]
      )
      return user[0]
    } catch (error) {
      console.log('👀 👉🏽 ~  error:', error)
      
    }
  }
  static async updateUser (userId, {userName, alias}) {
    try {
      connection = databaseConnection.getConnection()
      const [result] = await connection.query(
      'UPDATE users SET userName = ?, alias = ?, updatedAt = ?  WHERE userId = ?;',
      [userName,alias, date, userId]
      )

      return result
    } catch (error) {
      console.log('👀 👉🏽 ~  error:', error)
    }
  }
  static async deleteUser (userId) {
    try {
      connection = databaseConnection.getConnection()
      const [result] = await connection.query(
        'DELETE FROM users WHERE userId = ?;',
        [userId]
      )
      return result
    } catch (error) {
      console.log('👀 👉🏽 ~  error:', error)
      
    }
  }
  }