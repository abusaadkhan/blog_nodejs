import { Router } from 'express'
import { logIn, logOut, signUp } from '../controllers/auth.controller.js'

const router = Router()

router.post('/signup',signUp)
router.post('/login',logIn)
router.get('/logout',logOut)

export default router