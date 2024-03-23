/**
 * Pruebas Unitarias: Estas pruebas se centran en probar unidades individuales de código de manera aislada, lo que significa que se prueban las funciones o métodos de la clase por separado, sin depender de otras partes del sistema. Se utilizan mocks o stubs para simular el comportamiento de las dependencias externas. Las pruebas unitarias son útiles para garantizar que cada función o método funcione correctamente según su especificación.
 *
 */

vi.mock('../models/mysql/users.js');
vi.mock('../services/mysql2/configDev.js')

// vi.mock('../services/mysql2/configDev.js', () => {
// 	return {

// 	}
// });


import { UserModel } from '../models/mysql/users.js';
import databaseConnection from '../services/mysql2/configDev.js';
console.log('👀 👉🏽 ~  databaseConnection:', databaseConnection.getConnection())

const data =  databaseConnection.getConnection()
console.log('👀 👉🏽 ~  data:', data.query())


afterEach(() => {
	vi.restoreAllMocks();
});

describe('USERS', () => {
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
