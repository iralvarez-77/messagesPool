import * as Yup from 'yup'
import userSchema from "../../middlewares/validateUser.js";
import { AuthModel } from "../models/mysql/auth.js";

export const register = async (req, res) => {
  try {
    await userSchema.validate(req.body)

    const {userId, userName, email, token} = await AuthModel.signUp(req.body);
      res.cookie("token", token)
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
    const {email, password} = req.body
    const user = await AuthModel.signIn(email,password)
  } catch (error) {
    console.log('👀 👉🏽 ~  error:', error)
    // if (error === 'Usuario no encontrado') 
    //   res.status(404).json({message: "el correo no está registrado"})
  }
}















