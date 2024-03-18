import databaseConnection from "../../config/db.config.js"
import dayjs from "dayjs"

let connection
const date = dayjs().format()

export class CategoryModel {
  static async createCategory ({categoryName}) {
    try {
      connection = databaseConnection.getConnection()
      const [result] = await connection.query(
        'INSERT INTO categories(categoryName, createdAt) VALUES(?,?);',
        [categoryName, date]
      )
      return result
    } catch (error) {
      console.log('👀 👉🏽 ~  error:', error)
    }
  }
  static async getAllCategories(){
    try {
      connection = databaseConnection.getConnection()
      const [categories] = await connection.query(
        'SELECT * FROM categories;',
      )
      return categories
    } catch (error) {
      console.log('👀 👉🏽 ~  error:', error)
    }
  }
  static async getCategory (categoryId) {
    try {
      connection = databaseConnection.getConnection()
      const [category] = await connection.query(
        'SELECT * FROM categories WHERE categoryId = ?;',
        [categoryId]
      )
      return category[0]
    } catch (error) {
      console.log('👀 👉🏽 ~  error:', error)
      
    }
  }
  static async updateCategory (categoryId, {categoryName}) {
    try {
      connection = databaseConnection.getConnection()
      const [result] = await connection.query(
        'UPDATE categories SET categoryName = ?, updatedAt = ?  WHERE categoryId = ?;',
        [categoryName, date, categoryId]
      )
      return result
    } catch (error) {
      console.log('👀 👉🏽 ~  error:', error)
      
    }
  }
  static async deleteCategory (categoryId) {
    try {
      connection = databaseConnection.getConnection()
      const [result] = await connection.query(
        'DELETE FROM categories WHERE categoryId = ?',
        [categoryId]
      )
      return result
    } catch (error) {
      console.log('👀 👉🏽 ~  error:', error)
    }
  }
}