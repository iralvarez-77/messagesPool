import jwt from 'jsonwebtoken'

export const authRequired = (req, res, next) => {
  try {
    const {AccessToken} = req.cookies
    if (!AccessToken) throw new Error('No AccessToken provided')

    const decoded = jwt.verify(AccessToken, process.env.PRIVATE_KEY)
    req.user = decoded;
    next()

  } catch (error) {
    console.log('👀 👉🏽 ~  errorAuthRequired:', error)
    
    if (error.message === 'No AccessToken provided') 
      return res.status(401).json({message: 'Unauthorized. Token is missing.'}) 

    if (error.name === "TokenExpiredError") 
      return res.status(401).json({message: 'Invalid AccessToken. Unauthorized access.'})

    if(error.name === 'JsonWebTokenError') 
      return res.status(401).json({message: 'Invalid AccessToken. Unauthorized access.'})

    res.status(403).json({mesagge: "Forbidden"})
  }

}