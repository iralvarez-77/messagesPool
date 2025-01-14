import { UserModel } from "./users.js";

export class AuthModel {
  static async signUp(body) {
    try {

      const user  = await UserModel.createUser(body)
      console.log('👀 👉🏽 ~  user:', user)
      return user
      
    } catch (error) {
      console.log('👀 👉🏽 ~  errorErrorrrrrr:', error);
      throw error
    }
  }

  login() {

  }
}
