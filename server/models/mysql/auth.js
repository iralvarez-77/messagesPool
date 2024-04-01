// import { UserModel } from "../models/mysql/users.js";
import { UserModel } from "./users.js";

export class AuthModel {
  static async register(body) {
    const {data}  = await UserModel.createUser(body)
    return data
  }

  login() {

  }
}
