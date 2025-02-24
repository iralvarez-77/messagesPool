import jwt from 'jsonwebtoken'

export const authRequired = (req, res, next) => {
  try {
    const {token} = req.cookies
    if (!token) throw new Error('No token provided')

    const decoded = jwt.verify(token, process.env.PRIVATE_KEY)
    console.log('👀 👉🏽 ~  decoded:', decoded)
    req.user = decoded;
    next()

  } catch (error) {
    console.log('👀 👉🏽 ~  errorAuthRequired:', error)
    
    if (error.message === 'No token provided') 
      return res.status(401).json({message: 'Unauthorized. Token is missing.'}) 

    if (error.name === "TokenExpiredError") 
      return res.status(401).json({message: 'Invalid token. Unauthorized access.'})

    if(error.name === 'JsonWebTokenError') 
      return res.status(401).json({message: 'Invalid token. Unauthorized access.'})

    res.status(403).json({mesagge: "Forbidden"})
  }

}