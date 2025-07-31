import express from 'express'
import { signIn, signUp, logout } from '../controller/isAuth.js'
const router = express.Router();
router.post("/signin", signIn)
router.post("/signup", signUp)
router.get("/logout", logout)

export default router