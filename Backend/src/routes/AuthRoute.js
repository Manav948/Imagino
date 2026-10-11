import express from 'express'
import { signIn, signUp, logout, refreshSession } from '../controller/isAuth.js'
import { authRateLimit } from '../middleware/rateLimit.js';
import { signInSchema, signUpSchema, validateRequest } from '../middleware/validation.js';
import { requireTrustedBrowserRequest } from '../middleware/csrf.js';
const router = express.Router();
router.post("/signin", authRateLimit, validateRequest(signInSchema), signIn);
router.post("/signup", authRateLimit, validateRequest(signUpSchema), signUp);
router.post("/refresh", authRateLimit, requireTrustedBrowserRequest, refreshSession);
router.post("/logout", requireTrustedBrowserRequest, logout);

export default router
