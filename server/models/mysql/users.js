import instanceDB from '../../services/mysql2/configDev.js';
import { getOffSet, getTotalPages, responseFn } from '../../helpers/index.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

export class UserModel {
	static async createUser({ userName, email, password }) {
		try {
			
			const hash = await bcrypt.hash(password, 10);

			const result = await instanceDB.query(
				'INSERT INTO users(userName, email, password) VALUES(?,?,?);',
				[userName, email, hash]
			);
			const userId = result.insertId
				
			const token = await jwt.sign( {userId} , process.env.PRIVATE_KEY );

			const data = {
				userId,
				userName,
				email,
				token
			};
			
			return data;
		} catch (error) {
			console.log('👀 👉🏽 ~  errorDetectado:', error);
			throw error
		}
	}

	static async getAllUsers({ page, limit }) {
		try {
			const users = await instanceDB.query('SELECT * FROM users LIMIT ?,?', [
				getOffSet(page, limit),
				limit,
			]);

			if (users.length === 0) throw new Error();

			const result = await instanceDB.query('SELECT COUNT(*) AS total FROM users');

			const totalPages = getTotalPages(result[0].total, limit);

			const data = {
				users,
				pagination: {
					page,
					limit,
					totalPages,
				},
			};

			return responseFn(data, 200);
		} catch (error) {
			console.log('👀 👉🏽 ~  error:', error);
			if (error.message === '') return responseFn([], 404);
			return responseFn(error.message, 500);
		}
	}

	static async getUser(userId) {
		try {
			const user = await instanceDB.query(
				'SELECT * FROM users WHERE userId = ?;',
				[userId]
			);
			if (user.length === 0) throw new Error();
			return responseFn(user[0], 200);
		} catch (error) {
			console.log('👀 👉🏽 ~  error:', error);
			if (error.message === '') return responseFn('User not found', 404);
			return responseFn(error.message, 500);
		}
	}

	// static async updateUser(userId, { userName, alias }) {
	// 	try {
	// 		const result = await instanceDB.query(
	// 			'UPDATE users SET userName = ?, alias = ?, updatedAt = ?  WHERE userId = ?;',
	// 			[userName, alias, date, userId]
	// 		);

	// 		if (result.affectedRows === 0) throw new Error();

	// 		const data = {
	// 			userId,
	// 			userName,
	// 			alias,
	// 		};

	// 		return responseFn(data, 200);
	// 	} catch (error) {
	// 		console.log('👀 👉🏽 ~  error:', error);
	// 		if (error.message === '') return responseFn('User not found', 404);
	// 		return responseFn(error.message, 500);
	// 	}
	// }

	static async deleteUser(userId) {
		try {
			const result = await instanceDB.query(
				'DELETE FROM users WHERE userId = ?;',
				[userId]
			);
			if (result.affectedRows === 0) throw new Error();

			return responseFn('User deleted', 204);
		} catch (error) {
			console.log('👀 👉🏽 ~  error:', error);
			if (error.message === '') return responseFn('User not found', 404);
			return responseFn(error.message, 500);
		}
	}
}
