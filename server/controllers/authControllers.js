import { responseFn } from "../helpers/index.js";
import { AuthModel } from "../models/mysql/auth.js"; 

export const register = async (req, res) => {
  try {
    const newUser = await AuthModel.register(req.body)
    res.status(newUser.statusCode).json(newUser)
    console.log('👀 👉🏽 ~  newUser:', newUser)
    
  } catch (error) {
    console.log('👀 👉🏽 ~  errorController:', error)
    return responseFn(error.message, 500)
  }
} 


export const login = (req,res) => {
  console.log('LOGIN');

}















