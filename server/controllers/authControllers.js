import { AuthModel } from "../models/mysql/auth.js"; 
import { UserModel } from "../models/mysql/users.js";

export const register = async (req, res) => {
  const newUser = await AuthModel.register(req.body)
  console.log('👀 👉🏽 ~  newUser:', newUser)
  // res.status(newUser.statusCode).json(newUser)
} 


export const login = (req,res) => {
  console.log('LOGIN');

}















