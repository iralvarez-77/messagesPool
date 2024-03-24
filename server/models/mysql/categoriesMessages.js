import instanceDB from '../../services/mysql2/configDev.js';
import { responseFn } from '../../helpers/index.js';

let connection;
export class CategoriesMessagesModel {
	static async createRelation(messageId, categoriesIds) {
		try {
			let data = [];
			connection = await instanceDB.getConnection();
			for (const categoryId of categoriesIds) {
				const [result] = await connection.query(
					'INSERT INTO categories_messages(categoryID, messageID) VALUES(?,?);',
					[categoryId, messageId]
				);

				data.push({
					id: result.insertId,
					categoryId,
					messageId,
				});
			}

			return responseFn(data, 201);
		} catch (error) {
			console.log('👀 👉🏽 ~  error:', error);
			if (error.code === 'ER_DUP_ENTRY') return responseFn(error.message, 409);
			return responseFn(error.message, 500);
		}
	}

	static async getMessagesByCategoryId(categoryId) {
		try {
			connection = instanceDB.getConnection();
			const [messages] = await connection.query(
				`SELECT  c.categoryId, categoryName, content 
          FROM categories c 
          INNER JOIN categories_messages cm ON c.categoryId = cm.categoryID
          INNER JOIN messages m ON cm.messageID = m.messageId
          WHERE c.categoryId = ?`,
				[categoryId]
			);
			if (messages.length === 0) throw new Error();
			return responseFn(messages, 200);
		} catch (error) {
			console.log('👀 👉🏽 ~  error:', error);
			if (error.message === '') return responseFn([], 404);
			return responseFn(error.message, 500);
		}
	}

	static async getCategoriesByMessageId(messageId) {
		try {
			connection = instanceDB.getConnection();
			const [categories] = await connection.query(
				`SELECT m.messageId, categoryName, content 
          FROM categories c
          INNER JOIN categories_messages cm ON c.categoryId = cm.categoryID
          INNER JOIN messages m ON cm.messageID = m.messageId
          WHERE m.messageId = ?`,
				[messageId]
			);
			if (categories.length === 0) throw new Error();
			return responseFn(categories, 200);
		} catch (error) {
			console.log('👀 👉🏽 ~  error:', error);
			if (error.message === '') return responseFn([], 404);
			responseFn(error.message, 500);
		}
	}
}
