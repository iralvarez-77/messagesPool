// import { UserModel } from "../models/mysql/users.js";
import { UserModel } from "./users.js";
import instanceDB from "../../services/mysql2/configDev.js"

export class AuthModel {
  static async register(body) {
    try {
      const { data: user }  = await UserModel.createUser(body)
      return user
      
    } catch (error) {
      console.log('👀 👉🏽 ~  errorDeAuthModel:', error)
    }
  }

  login() {

  }
}
