import { Router } from 'express'
import { authRequired } from '../../middlewares/validateToken.js'
import { register, login, logOut, profile } from '../controllers/authControllers.js'

const router = Router()

router.post('/register', register)
router.post('/login', login)
router.post('/logout', logOut)
router.get('/profile', authRequired, profile)

export default router 