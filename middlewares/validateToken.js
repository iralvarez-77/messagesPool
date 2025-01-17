import jwt from 'jsonwebtoken'

export const authRequired = (req, res, next) => {
  try {
    const {token} = req.cookies
    if (!token) return res.status(401).json({mesagge: "Unauthorized"})

    const decoded = jwt.verify(token, process.env.PRIVATE_KEY)
    req.user = decoded;
    next()

  } catch (error) {
    console.log('👀 👉🏽 ~  errorAuthRequired:', error)
    res.status(403).json({mesagge: "Forbidden"})
  }

}