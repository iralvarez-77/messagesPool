import { UserModel } from "../models/mysql/users.js";

export const createUser = async (req, res) => {
  const body = req.body
  console.log('👀 👉🏽 ~  body:', body)
  const data = await UserModel.createUser(body)
  console.log('👀 👉🏽 ~  data:', data)
  res.status(201).json(data)
}