import databaseConnection from "../../config/db.config.js"
import {getOffSet, getTotalPages, responseFn} from '../../helpers/index.js'
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
      const data = {
        categoryId : result.insertId,
        categoryName
      }
      return responseFn(data, 201)
    } catch (error) {
      console.log('👀 👉🏽 ~  error:', error)
      if ( error.code === 'ER_DUP_ENTRY') return responseFn(error.message, 400)
      return responseFn(error.message, 500)
    }
  }
  static async getAllCategories({page, limit}){
    try {
      connection = databaseConnection.getConnection()
      const offset = getOffSet(page, limit)
      const [categories] = await connection.query(
        'SELECT * FROM categories LIMIT ?,?',
        [offset, limit]
      )
      if (categories.length === 0) throw new Error()
      
      const [result] = await connection.query(
        'SELECT COUNT(*) AS total FROM categories'
      )

      const totalPages = getTotalPages(result[0].total, limit)
      const data = {
        categories,
        pagination: {
          page,
          limit,
          totalPages
        }
      }
      return responseFn(data, 200)
    } catch (error) {
      console.log('👀 👉🏽 ~  error:', error)
      if (error.message === "") return responseFn([], 404)
      return responseFn(error.message, 500)
    }
  }
  static async getCategory (categoryId) {
    try {
      connection = databaseConnection.getConnection()
      const [category] = await connection.query(
        'SELECT * FROM categories WHERE categoryId = ?;',
        [categoryId]
      )
      if(category.length === 0) throw new Error()

      return responseFn(category[0], 200)
    } catch (error) {
      console.log('👀 👉🏽 ~  error:', error)
      if(error.message === "") return responseFn('Category not found', 404)
      return responseFn(error.message, 500)
      
    }
  }
  static async updateCategory (categoryId, {categoryName}) {
    try {
      connection = databaseConnection.getConnection()
      const [result] = await connection.query(
        'UPDATE categories SET categoryName = ?, updatedAt = ?  WHERE categoryId = ?;',
        [categoryName, date, categoryId]
      )
      if(result.affectedRows === 0) throw new Error()

      const data = {
        categoryId,
        categoryName
      }

      return responseFn(data, 200)
    } catch (error) {
      console.log('👀 👉🏽 ~  error:', error)
      if(error.message === "") return responseFn('Category not found',404)
      return responseFn(error.message, 500)
    }
  }
  static async deleteCategory (categoryId) {
    try {
      connection = databaseConnection.getConnection()
      const [result] = await connection.query(
        'DELETE FROM categories WHERE categoryId = ?',
        [categoryId]
      )
      if(result.affectedRows === 0) throw new Error()

      return responseFn('category deleted', 204)
    } catch (error) {
      console.log('👀 👉🏽 ~  error:', error)
      if(error.message === "") return responseFn('category not found', 404)
      return responseFn(error.message , 500)
    }
  }
}