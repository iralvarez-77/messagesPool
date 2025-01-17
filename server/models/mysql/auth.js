import { UserModel } from "./users.js";
import instanceDB from '../../services/mysql2/configDev.js'
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';



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
      if (userFound.length === 0) {
        const error = new Error('User not found');
        error.statusCode = 404;  // Código de estado 404 (Not Found)
        throw error;  // Lanza el error
      }

      const isMatch = await bcrypt.compare(password, userFound[0].password)

      if (!isMatch) { 
        const error = new Error("invalid credentials")
        error.statusCode = 400
        throw error
      }
      const token = await jwt.sign({userId: userFound[0].userId }, process.env.PRIVATE_KEY, {expiresIn: '1h'});

      const { password: _, ...userWithoutPassword } = userFound[0];

      return {
        user: userWithoutPassword,
        token
      };
  
    } catch (error) {
      console.log('👀 👉🏽 ~  errorUserFound:', error)
      throw error
    }
  }

  static async logOut() {
    try {
      
    } catch (error) {
      console.log('👀 👉🏽 ~  errorLogOut:', error)
      
    }
  }

  static async protected(userId) {
  try {
    const user = await UserModel.getUser(userId)
    console.log('👀 👉🏽 ~  user:', user)
    const {password: _, ...userWithPass} = user
    return userWithPass 
  } catch (error) {
    console.log('👀 👉🏽 ~  error:', error)
    }
  }
}
