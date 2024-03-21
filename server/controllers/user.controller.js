import { UserModel } from "../models/mysql/users.js";
import { UserMessagesModel } from "../models/mysql/users_messages.js";

export const createUser = async (req, res) => {
  const {data, statusCode} = await UserModel.createUser(req.body)
  res.status(statusCode).json(data)
}

export const getAllUsers = async (_req, res) => {
  const {data, statusCode} = await UserModel.getAllUsers()
  res.status(statusCode).json(data)
}

export const getUser = async (req, res) => {
  const {data, statusCode} = await UserModel.getUser(req.params.userId)
  res.status(statusCode).json(data)
}

export const updateUser = async (req, res) => {
  const {data, statusCode} = await UserModel.updateUser(
    req.params.userId,
    req.body
  )
  res.status(statusCode).json(data)
}

export const deleteUser  = async (req,res) => {
  const {data, statusCode} = await UserModel.deleteUser(req.params.userId)
  res.status(statusCode).json(data)
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