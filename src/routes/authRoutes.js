import { Router } from 'express'
import { authRequired } from '../../middlewares/validateToken.js'
import { register, login, logOut, profile, authMe } from '../controllers/authControllers.js'
import { validateSchemas } from '../../middlewares/validateFunctions.js'
import { registerSchema, loginSchema } from '../../schemas/auth.schema.js'

const router = Router()

router.post('/register',validateSchemas(registerSchema), register)
router.post('/login', validateSchemas(loginSchema), login)
router.post('/logout', logOut)
router.get('/profile', authRequired, profile)
router.get('/auth', authMe);


export default router 