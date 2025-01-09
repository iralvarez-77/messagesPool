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
      return responseFn(error.message, 500);
      // if (error.code === 'ER_DUP_ENTRY') return responseFn('El correo electrónico ya está registrado.', 409);
    }
  }

  login() {

  }
}
