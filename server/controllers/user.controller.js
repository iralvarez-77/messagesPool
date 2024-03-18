import { UserModel } from "../models/mysql/users.js";

export const createUser = async (req, res) => {
  const data = await UserModel.createUser(req.body)
  res.status(201).json(data)
}

export const getAllUsers = async (_req, res) => {
  const  data = await UserModel.getAllUsers()
  res.status(200).json(data)
}

export const getUser = async (req, res) => {
  const data = await UserModel.getUser(req.params.userId)
  res.status(200).json(data)
}

export const updateUser = async (req, res) => {
  const data = await UserModel.updateUser(
    req.params.userId,
    req.body
  )
  res.status(200).json(data)
}

export const deleteUser  = async (req,res) => {
  const data = await UserModel.deleteUser(req.params.userId)
  res.status(204).json(data)
}