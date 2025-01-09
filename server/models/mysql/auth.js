import { responseFn } from "../../helpers/index.js";
import { UserModel } from "./users.js";

export class AuthModel {
  static async register(body) {
    try {

      const { data: user }  = await UserModel.createUser(body)
      console.log('👀 👉🏽 ~  user:', user)
      return responseFn(user, 201)
      
    } catch (error) {
      console.log('👀 👉🏽 ~  errorErrorrrrrr:', error);
      if (error.code === 'ER_DUP_ENTRY') {
        throw new Error('DUPLICATE_EMAIL');
      }
      throw new Error('INTERNAL_ERROR');
      // return responseFn(error.message, 500);
    }
  }

  login() {

  }
}
