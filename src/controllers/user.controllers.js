import { UserModel } from "../models/mysql/users.js";
import { UserMessagesModel } from "../models/mysql/usersMessages.js";
import { stringToNumber } from '../helpers/index.js';
import { sendErrorResponse } from "../../utils/responseUtils.js";


// export const createUser = async (req, res) => {
//   const newUser = await UserModel.createUser(req.body)
//   res.status(newUser.statusCode).json(newUser)
// }

export const getAllUsers = async (req, res) => {
  try {
    const query = stringToNumber(req.query);
    const users = await UserModel.getAllUsers(query)
    res.status(200).json(users)
    
  } catch (error) {
    console.log('👀 👉🏽 ~  errorControllerAllUsers:', error)
    if (error.message === '')
      sendErrorResponse(res, 404, [])

    sendErrorResponse(res, 500, 'Internal Server Error')
  }
}

export const getUser = async (req, res) => {
  try {
    const user = await UserModel.getUser(req.params.userId)
    res.status(200).json(user)
    
  } catch (error) {
    console.log('👀 👉🏽 ~  errorControllerGetUser:', error)
    if (error.message === '') 
      sendErrorResponse(res,404, "User not found" )
    sendErrorResponse(res, 500, 'internal Server Error')
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