/**
 * Pruebas Unitarias: Estas pruebas se centran en probar unidades individuales de código de manera aislada, lo que significa que se prueban las funciones o métodos de la clase por separado, sin depender de otras partes del sistema. Se utilizan mocks o stubs para simular el comportamiento de las dependencias externas. Las pruebas unitarias son útiles para garantizar que cada función o método funcione correctamente según su especificación.
 *
 */

vi.mock('mysql2/promise');

import mysql from 'mysql2/promise';
import databaseConnection from '../services/mysql2/configDev.js';

describe('DatabaseConnection', () => {
	afterEach(() => {
		vi.restoreAllMocks();
	});

	it('should have a single instance', () => {
		const connection1 = databaseConnection.getConnection();
		const connection2 = databaseConnection.getConnection();
		expect(connection1).toEqual(connection2);
	});

	it('should conect to the database', async () => {

		const mockValue = {};
		mysql.createConnection.mockResolvedValue(mockValue);

		const instance = databaseConnection.getConnection();
		await instance._createConnection()

		expect(instance.connection).toStrictEqual(mockValue);
    expect(instance.connection).not.toBeNull();
	});
});
