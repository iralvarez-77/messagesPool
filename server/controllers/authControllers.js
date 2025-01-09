import { responseFn } from "../helpers/index.js";
import { AuthModel } from "../models/mysql/auth.js"; 

export const register = async (req, res) => {
  try {
    const newUser = await AuthModel.register(req.body)
    console.log('👀 👉🏽 ~  newUser:', newUser)
    // Respuesta exitosa con código 201
    res.status(201).json({
      message: "Usuario creado con éxito",
      newUser,
    });
    // res.status(newUser.statusCode).json(newUser)
    
  } catch (error) {
    console.log('👀 👉🏽 ~  errorController:', error)
    if (error.message === 'DUPLICATE_EMAIL') {
      return res.status(409).json({ message: "El correo electrónico ya está registrado." });
    }
    return res.status(500).json({ message: "Error interno del servidor." });
  }
} 


export const login = (req,res) => {
  console.log('LOGIN');

}















