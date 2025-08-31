import express from 'express'
import {
  loginUser,
  logoutUser,
  registerUser,
} from '../controllers/auth.controller.js'
import {
  loginSchema,
  registerSchema,
} from '../utils/validators/user.validator.js'
import { validate } from '../middlewares/validate.js'
import { checkUniqueUser } from '../middlewares/checkUniqueUser.js'
import { 
  registerRateLimiter, 
  loginRateLimiter 
} from '../middlewares/rateLimiter.js' // ← Path yang benar

const router = express.Router()

router.post(
  '/register',
  registerRateLimiter,  // ← Middleware
  validate(registerSchema),
  checkUniqueUser,
  registerUser
)

router.post(
  '/login',
  loginRateLimiter,     // ← Middleware
  validate(loginSchema),
  loginUser
)

router.post('/logout', logoutUser)

export default router