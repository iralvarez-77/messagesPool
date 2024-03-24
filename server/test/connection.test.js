/**
 * Pruebas Unitarias: Estas pruebas se centran en probar unidades individuales de código de manera aislada, lo que significa que se prueban las funciones o métodos de la clase por separado, sin depender de otras partes del sistema. Se utilizan mocks o stubs para simular el comportamiento de las dependencias externas. Las pruebas unitarias son útiles para garantizar que cada función o método funcione correctamente según su especificación.
 *
 */

vi.mock('mysql2/promise');

import mysql from 'mysql2/promise';
import dataBaseConnection from '../services/mysql2/configDev.js';
import instanceDB from '../services/mysql2/configDev.js';

describe('DataBaseConnection', () => {
	afterEach(async () => {
		vi.restoreAllMocks();
	});

	it('should have a single instance', async () => {
		const instance1 = dataBaseConnection
		const instance2 = instanceDB
		expect(instance1).toBe(instance2)
		expect(instance1 === instance2).toBe(true)
	});

	it('should conect to the database', async () => {
		const mockValue = {};
		mysql.createConnection.mockResolvedValue(mockValue);

    // Conectar a la base de datos
    const dbConnected = await dataBaseConnection.connect();
    // Verificar que la conexión se haya establecido
    expect(dbConnected).not.toBeNull();

		expect(dbConnected).toStrictEqual(mockValue);
	});

	it('should disconnect from the database', async () => {

    const mockDisconnect = {
      end: vi.fn().mockReturnValue(null)
    };
    
    //convertir la propiedad connection de la instancia dataBaseconnection en un mock 
    dataBaseConnection.connection = mockDisconnect
		// // Desconectar de la base de datos
		await dataBaseConnection.disconnect();
		
		// Verificar que la conexión se haya cerrado
		expect(dataBaseConnection.connection.end()).toBeNull();
	});
});


