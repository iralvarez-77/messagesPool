import * as Yup from 'yup'
import userSchema from "../../middlewares/validateUser.js";
import { AuthModel } from "../models/mysql/auth.js";
import loginSchema from "../../middlewares/validateLogin.js"

export const register = async (req, res) => {
  try {
    await userSchema.validate(req.body)

    const { userId, userName, email } = await AuthModel.signUp(req.body);
      res.status(201).json({
      message: 'Usuario creado éxitosamente',
      data: {userId, userName, email},
    });
    
  } catch (error) {
    if (error instanceof Yup.ValidationError) {
      return res.status(400).json({
        message: 'Parámetros inválidos',
        errors: error.errors,  // Aquí se envían los mensajes personalizados
      });
    }

    if (error.message === 'DUPLICATE_EMAIL')
      res.status(409).json({ message: 'El correo ya se encuentra registrado' })
    
    res.status(500).json({ message: 'Error interno del servidor' });
  }

}

export const login = async (req, res) => {
  try {
    const { email, password } = req.body
    await loginSchema.validate({ email, password })

    const { user, token } = await AuthModel.signIn(email,password)
    res.cookie("token", token)
    res.status(200).json({
      message: 'successfully',
      data: {user},
    });

  } catch (error) {
    console.log('👀 👉🏽 ~  errorLgin:', error)

    if (error.statusCode === 404 ) 
      res.status(404).json(error.message)

    if (error.statusCode === 400)
      res.status(400).json(error.message)

    if (error instanceof Yup.ValidationError) {
      return res.status(400).json({
        message: 'Parámetros inválidos',
        errors: error.errors,  // Aquí se envían los mensajes personalizados
      });
    }
  }
}

export const logOut =  (req, res) => {
  try {
    // authController.js
    res.clearCookie('token', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict'
    })
    res.status(200).json({ message: 'Logout successful' });
  } catch (error) {
    console.log('👀 👉🏽 ~  errorControllerLogOut:', error)
  }
};















