// vi.mock('dayjs', () => {
//   return {
//     default: vi.fn(   () => ({
//       format: vi.fn(() => '2024-03-24T12:00:00.000Z'), // Establece el valor de fecha deseado
//     })   ),
//   };
// });

vi.mock('../../services/mysql2/configDev.js');

import { UserModel } from '../../models/mysql/users.js';
import instanceDB from '../../services/mysql2/configDev.js';
import { responseFn } from '../../helpers/index.js';

const mockBody = (userName = 'userName', alias = 'alias') => ({
	userName,
	alias,
});

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
			const data = await UserModel.createUser(mockBody());
			expect(data.statusCode).toBe(201);
		});

		it('should return an error with status code 400 when user already is exists', async () => {
			const data = await UserModel.createUser(mockBody());
			// expect(instanceDB.query).toHaveBeenCalledTimes(1);
			const mockError = new Error("Duplicate entry 'lucho' for key 'users.alias_UNIQUE'");
			mockError.code = 'ER_DUP_ENTRY';

			instanceDB.query.mockRejectedValue(mockError);
			const data2 = await UserModel.createUser(mockBody());
			// expect(instanceDB.query).toHaveBeenCalledTimes(2);
			expect(data2.statusCode).toBe(400)
		});
	});

	it('should return an error when some other error is exists', async () => {
		instanceDB.query.mockRejectedValue(new Error('some other error'))
		const data = await UserModel.createUser(mockBody())
		expect(data.statusCode).toBe(500)
	})
});

// it('should get with a mock', () => {
//   const mock = vi.fn().mockImplementation(getLatest)

//   expect(mock()).toEqual(messages.items[messages.items.length - 1])
//   expect(mock).toHaveBeenCalledTimes(1)

//   mock.mockImplementationOnce(() => 'access-restricted')
//   expect(mock()).toEqual('access-restricted')

//   expect(mock).toHaveBeenCalledTimes(2)

//   expect(mock()).toEqual(messages.items[messages.items.length - 1])
//   expect(mock).toHaveBeenCalledTimes(3)
// })when 
