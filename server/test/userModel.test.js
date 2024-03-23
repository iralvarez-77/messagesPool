

vi.mock('../models/mysql/users.js');
vi.mock('../services/mysql2/configDev.js')
vi.mock('mysql2/promise')

import { UserModel } from '../models/mysql/users.js';
import mysql from 'mysql2/promise';
import databaseConnection from '../services/mysql2/configDev.js';



// console.log('👀 👉🏽 ~  mysql:', mysql.createConnection)
// console.log('👀 👉🏽 ~  databaseConnection:', databaseConnection.getConnection())




describe('USERS', () => {

	afterEach(() => {
		vi.restoreAllMocks();
	});

	it('should create new user', () => {});
	// it('should create new user', () => {
	// })
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
// })

