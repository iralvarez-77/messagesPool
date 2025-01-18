import { UserModel } from "../models/mysql/users.js";
import { UserMessagesModel } from "../models/mysql/usersMessages.js";
import { stringToNumber } from '../helpers/index.js';


// export const createUser = async (req, res) => {
//   const newUser = await UserModel.createUser(req.body)
//   res.status(newUser.statusCode).json(newUser)
// }

export const getAllUsers = async (req, res) => {
	const query = stringToNumber(req.query);
  const users = await UserModel.getAllUsers(query)
  res.status(users.statusCode).json(users)
}

export const getUser = async (req, res) => {
  try {
    const user = await UserModel.getUser(req.params.userId)
    res.status(user.statusCode).json(user)
    
  } catch (error) {
    console.log('👀 👉🏽 ~  errorControllerGetUser:', error)
    if (error.message === '') 
      return res.status(404).json({message: "User not found"});
    res.status(500).json({message: "Internal Server Error"})
  }
}

export const updateUser = async (req, res) => {
  const updatedUser = await UserModel.updateUser(
    req.params.userId,
    req.body
  )
  res.status(updatedUser.statusCode).json(updatedUser)
}

export const deleteUser  = async (req,res) => {
  const deletedUser = await UserModel.deleteUser(req.params.userId)
  res.status(deletedUser.statusCode).json(deletedUser)
}

export const createRelation = async (req, res) => {
  const {data, statusCode} = await UserMessagesModel.createRelation(
    req.params.userId,
    req.body.messagesIds
  )
  res.status(statusCode).json(data)
}

export const getMessagesByUserId = async (req,res) => {
  const {data, statusCode} = await UserMessagesModel.getMessagesByUserId(
    req.params.userId
  )
  res.status(statusCode).json(data)
}