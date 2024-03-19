import databaseConnection from "../../config/db.config.js";
import {responseFn} from '../../common/index.js'

let connection
let data = []
export class CategoriesMessagesModel {
  static async create (messageId, categoriesIds) {
    try {
      connection = await databaseConnection.getConnection()
      for (const categoryId of categoriesIds) {
        const [result] = await connection.query(
          'INSERT INTO categories_messages(categoryID, messageID) VALUES(?,?);',
          [categoryId, messageId]
        )

        data.push({
          id: result.insertId,
          categoryId,
          messageId
        })
      }

      return responseFn(data, 201)
    } catch (error) {
      console.log('👀 👉🏽 ~  error:', error)
      if (error.code === 'ER_DUP_ENTRY') return responseFn(error.message, 404)
      return responseFn(error.message, 500)
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