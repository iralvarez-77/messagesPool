import databaseConnection from '../../config/db.config.js'
import { getOffSet, getTotalPages, responseFn } from '../../helpers/index.js'
import dayjs from 'dayjs'

let connection
const date = dayjs().format()

export class UserModel {
  static async createUser ({userName, alias}) {
    try {
      connection = databaseConnection.getConnection()
      const [result] = await connection.query(
        'INSERT INTO users(userName, alias, createdAt) VALUES(?,?,?);',
        [userName,alias, date]
      )
      const data = {
        userId: result.insertId,
        userName,
        alias
      }
      return responseFn(data, 201)
    } catch (error) {
      console.log('👀 👉🏽 ~  error:', error)
      if(error.code === 'ER_DUP_ENTRY') return responseFn(error.message, 400)
      return responseFn(error.message, 500)
    }
  }

  static async getAllUsers ({page, limit}) {
    try {

      connection = databaseConnection.getConnection()
      const offset = getOffSet(page,limit)

      const [ users ] = await connection.query(
        'SELECT * FROM users LIMIT ?,?',
        [offset, limit]
      )
      if (users.length === 0) throw new Error()
      
      const [result] = await connection.query(
        'SELECT COUNT(*) AS total FROM users'
      )

      const totalPages = getTotalPages(result[0].total, limit)

      const data = {
        users,
        pagination:{
          page,
          limit,
          totalPages
        }
      }


      return responseFn(data, 200)
    } catch (error) {
      console.log('👀 👉🏽 ~  error:', error)
      if (error.code === "") return responseFn([], 404)
      return responseFn(error.message, 500)
    }
  }

  static async getUser (userId) {
    try {
      connection = databaseConnection.getConnection()
      const [user] = await connection.query(
        'SELECT * FROM users WHERE userId = ?;',
        [userId]
      )
      if (user.length === 0) throw new Error()
      return responseFn(user[0], 200)
    } catch (error) {
      console.log('👀 👉🏽 ~  error:', error)
      if (error.message === "") return responseFn('User not found', 404)
      return responseFn(error.message, 500)
      
    }
  }

  static async updateUser (userId, {userName, alias}) {
    try {
      connection = databaseConnection.getConnection()
      const [result] = await connection.query(
      'UPDATE users SET userName = ?, alias = ?, updatedAt = ?  WHERE userId = ?;',
      [userName,alias, date, userId]
      )

      if (result.affectedRows === 0) throw new Error()

      const data = {
        userId,
        userName,
        alias
      }

      return responseFn(data, 200)
    } catch (error) {
      console.log('👀 👉🏽 ~  error:', error)
      if(error.message === "") return responseFn('User not found', 404)
      return responseFn(error.message, 500)
    }
  }

  static async deleteUser (userId) {
    try {
      connection = databaseConnection.getConnection()
      const [result] = await connection.query(
        'DELETE FROM users WHERE userId = ?;',
        [userId]
      )
      if(result.affectedRows === 0) throw new Error()

      return responseFn('User deleted',204)
    } catch (error) {
      console.log('👀 👉🏽 ~  error:', error)
      if (error.message === "") return responseFn('User not found', 404)
      return responseFn(error.message, 500)
    }
  }
  }