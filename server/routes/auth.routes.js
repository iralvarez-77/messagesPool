import { Router } from 'express'
import { register, login, logOut } from '../controllers/authControllers.js'

const router = Router()

router.post('/register', register)
router.post('/login', login)
router.post('/logout', logOut)

export default router 