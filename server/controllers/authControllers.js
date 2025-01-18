import { AuthModel } from "../models/mysql/auth.js";

export const register = async (req, res) => {
  try {

    const { userId, userName, email } = await AuthModel.signUp(req.body);
      res.status(201).json({
      message: 'Usuario creado éxitosamente',
      data: {userId, userName, email},
    });
    
  } catch (error) {
    if (error.message === 'DUPLICATE_EMAIL')
      res.status(409).json({ message: 'El correo ya se encuentra registrado' })
    
    res.status(500).json({ message: 'Error interno del servidor' });
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
      res.status(404).json(error.message)

    if (error.statusCode === 400)
      res.status(400).json(error.message)
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














