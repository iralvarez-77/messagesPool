import { UserModel } from "./users.js";
import instanceDB from '../../services/mysql2/configDev.js'

export class AuthModel {
  static async signUp(body) {
    try {

      const user  = await UserModel.createUser(body)
      console.log('👀 👉🏽 ~  user:', user)
      return user
      
    } catch (error) {
      console.log('👀 👉🏽 ~  errorSingUp:', error);
      throw error
    }
  }

  static async signIn(email, password) {
    try {
      const userFound = await instanceDB.query(
        'SELECT * FROM users  WHERE email = ? LIMIT 1;',
				[email]
      );
      console.log('👀 👉🏽 ~  userfound:', userFound)
      if (userFound.length=== 0) throw new Error('Usuario no encontrado');
      // if (userFound.length === 0) {
      //   const error = new Error('Usuario no encontrado');
      //   error.statusCode = 404;  // Código de estado 404 (Not Found)
      //   throw error;  // Lanza el error
      // }


    } catch (error) {
      console.log('👀 👉🏽 ~  errorUserFound:', error)
      throw error
    }
  }
}
