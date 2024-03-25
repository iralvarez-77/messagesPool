// vi.mock('dayjs', () => {
//   return {
//     default: vi.fn(   () => ({
//       format: vi.fn(() => '2024-03-24T12:00:00.000Z'), // Establece el valor de fecha deseado
//     })   ),
//   };
// });

vi.mock('../../services/mysql2/configDev.js');
// vi.mock('../../helpers/index.js');
vi.mock('days.js');

import { UserModel } from '../../models/mysql/users.js';
import instanceDB from '../../services/mysql2/configDev.js';
// import dayjs from 'dayjs';
import { responseFn, getOffSet, getTotalPages } from '../../helpers/index.js';
import dayjs from 'dayjs';

const mockBody = {
	userName: 'userName',
	alias: 'alias'
}

const mockAllUser = [
	{
	userId: 1,
	userName: "userName",
	alias: "alias",
	createdAt: '2024-03-17T14:50:41.000Z',
	updatedAt: '2024-03-19T15:20:43.000Z'
	},
	{
		userId : 2,
		userName: "userName",
		alias: "mockAlias",
		createdAt: '2024-03-17T14:50:41.000Z',
		updatedAt: '2024-03-19T15:20:43.000Z'
	}
]

const queries = {
	page: 1,
	limit: 5
}

const date = dayjs().format()

describe('USERS', () => {
	beforeEach(() => {
		const mockInsertId = 2;
		const mockResult = { insertId: mockInsertId };
		instanceDB.query = vi.fn().mockResolvedValue(mockResult);
	});

	afterEach(() => {
		vi.restoreAllMocks();
	});

	describe('createUser', () => {
		it('should create new user', async () => {
			const res = await UserModel.createUser(mockBody);
			expect(res.statusCode).toBe(201);
			// Verifica que la función query fue llamada con los argumentos correctos
			expect(instanceDB.query).toHaveBeenCalledWith(
				'INSERT INTO users(userName, alias, createdAt) VALUES(?,?,?);',
				[mockBody.userName, mockBody.alias, date ]
			);
		});

		it('should return an error with status code 400 when user already is exists', async () => {
			const res = await UserModel.createUser(mockBody);
			// expect(instanceDB.query).toHaveBeenCalledTimes(1);
			const mockError = new Error("Duplicate entry 'lucho' for key 'users.alias_UNIQUE'");
			mockError.code = 'ER_DUP_ENTRY';

			instanceDB.query.mockRejectedValue(mockError);
			const result2 = await UserModel.createUser(mockBody);
			// expect(instanceDB.query).toHaveBeenCalledTimes(2);
			expect(result2.statusCode).toBe(400)
		});

		it('should return an statusCode 500 when some other error is exists', async () => {
			instanceDB.query.mockRejectedValue(new Error('some other error'))
			const res = await UserModel.createUser(mockBody)
			expect(res.statusCode).toBe(500)
		})
	});

	describe('getAllUsers', () => {
		it('should return users with pagination res data', async () => {
			const mockTotalUsers = 2;
			instanceDB.query 
			.mockResolvedValueOnce(mockAllUser)
			.mockResolvedValueOnce([{ total: mockTotalUsers }])
			
				const res = await UserModel.getAllUsers(queries);
				expect(res.statusCode).toBe(200);
				expect(res).toHaveProperty('data');
				expect(res.data).toHaveProperty('users');
				expect(res.data).toHaveProperty('pagination');
						
		});
		it('should return status code 404 when users not exists', async () => {
			// console.log(await instanceDB.query());
			instanceDB.query.mockResolvedValueOnce([])
			const res = await UserModel.getAllUsers(queries)
			console.log('👀 👉🏽 ~  res:', res)
			
			expect(instanceDB.query).toHaveBeenCalledTimes(1)
			expect(res.statusCode).toBe(404)
		})
		it('', () => {
			
		})
	});
});


