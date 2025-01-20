import { AuthModel } from "../models/mysql/auth.js";
import { sendErrorResponse } from '../../utils/responseUtils.js'

export const register = async (req, res) => {
  try {

    const user = await AuthModel.signUp(req.body);
      res.status(201).json({
      message: 'Usuario creado éxitosamente',
      data: user,
    });
    
  } catch (error) {
    if (error.message === 'DUPLICATE_EMAIL')
      sendErrorResponse(res, 409, 'Email is already registered')

    sendErrorResponse(res, 500, 'Internal Server Error')
  }

}

export const login = async (req, res) => {
  try {
    const { email, password } = req.body

    const { user, token } = await AuthModel.signIn(email,password)
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict'
    })
    res.status(200).json({
      message: 'successfully',
      data: {user},
    });

  } catch (error) {
    console.log('👀 👉🏽 ~  errorLgin:', error)

    if (error.statusCode === 404 ) 
      sendErrorResponse(res, 404, error.message)

    if (error.statusCode === 400)
      sendErrorResponse(res, 400, error.message)
  }
}

export const logOut =  (_req, res) => {
  try {
    res.clearCookie('token')
    res.status(200).json({ message: 'Logout successful' });
  } catch (error) {
    console.log('👀 👉🏽 ~  errorControllerLogOut:', error)
  } 
};

export const profile = async (req, res) => {
  try {
    const userFound = await AuthModel.protected(req.user.userId)
  
    res.status(200).json({
      message: 'successfully',
      data: userFound,
    });
  } catch (error) {
    console.log('👀 👉🏽 ~  errorProfile:', error)
    
  }
}














