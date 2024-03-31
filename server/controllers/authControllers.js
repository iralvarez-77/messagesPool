import { AuthModel } from "../models/mysql/auth.js"; 

export const register = async (req,_res) => {
  const {body} = req.body
  const data = await await AuthModel.register(body)
  console.log('👀 👉🏽 ~  data:', data)
  console.log('register');
}

export const login = (req,res) => {
  console.log('LOGIN');

}















