// import { UserModel } from "../models/mysql/users.js";
import { UserModel } from "./users.js";
import bcrypt from bcrypt

export class AuthModel {
  static async register(body) {
    try {
      const { data: user }  = await UserModel.createUser(body)
      

      return user
      
    } catch (error) {
      console.log('👀 👉🏽 ~  error:', error)
    }
  }

  login() {

  }
}
