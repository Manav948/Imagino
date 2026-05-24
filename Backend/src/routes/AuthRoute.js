import express from 'express'
import { signIn, signUp, logout, refreshSession } from '../controller/isAuth.js'
import { authRateLimit } from '../middleware/rateLimit.js';
import { signInSchema, signUpSchema, validateRequest } from '../middleware/validation.js';
const router = express.Router();
router.post("/signin", authRateLimit, validateRequest(signInSchema), signIn);
router.post("/signup", authRateLimit, validateRequest(signUpSchema), signUp);
router.post("/refresh", authRateLimit, refreshSession);
router.get("/logout", logout);

export default router