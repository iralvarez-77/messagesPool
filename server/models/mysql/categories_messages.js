import databaseConnection from "../../config/db.config.js";
import dayjs from "dayjs";

let connection
const date = dayjs().format()

export class CategoriesMessagesModel {
  static async create (categoryId, messageId) {
    try {
      connection = await databaseConnection.getConnection()
      const [result] = await connection.query(
        'INSERT INTO categories_messages(categoryID, messageID, createdAt) VALUES(?,?,?);',
        [categoryId, messageId, date]
      )
      return result
    } catch (error) {
      console.log('👀 👉🏽 ~  error:', error)
    }
  }
  static async update () {
    try {
      connection = databaseConnection.getConnection()
      const [result] = await connection.query(
        '',
        []
      )
    } catch (error) {
      console.log('👀 👉🏽 ~  error:', error)
      
    }
  }
}