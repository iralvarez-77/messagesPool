import userSchema from "../../middlewares/validateUser.js";
import * as Yup from 'yup'
import { AuthModel } from "../models/mysql/auth.js";

export const register = async (req, res) => {
  try {
    await userSchema.validate(req.body, { abortEarly: false })

    const newUser = await AuthModel.signUp(req.body);
      res.status(201).json({
      message: 'Usuario creado exitosamente',
      data: newUser,
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



export const login = (req,res) => {
  console.log('LOGIN');

}















