import { responseFn } from "../helpers/index.js";
import { AuthModel } from "../models/mysql/auth.js"; 

export const register = async (req, res) => {
  try {
    const newUser = await AuthModel.register(req.body);
      res.status(201).json({
      message: 'Usuario creado exitosamente',
      data: newUser,
    });
    
  } catch (error) {
    if (error.message === 'DUPLICATE_EMAIL')
      res.status(409).json({ message: 'El correo ya se encuentra registrado' })
    res.status(500).json({ message: 'Error interno del servidor' });
  }
}



export const login = (req,res) => {
  console.log('LOGIN');

}















