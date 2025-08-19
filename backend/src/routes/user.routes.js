import express from 'express'
import {
	loginUser,
	logoutUser,
	registerUser,
} from '../controllers/user.controller.js'
import { loginSchema, registerSchema } from '../validators/user.validator.js'
import { validate } from '../middlewares/validate.js'
import { checkUniqueUser } from '../middlewares/checkUniqueUser.js'
import { createRateLimiter } from '../middlewares/rateLimiter.js'

const router = express.Router()

// limiter untuk register (ketat)
const registerLimiter = createRateLimiter({
	windowMs: 60 * 60 * 1000, // 1 jam
	max: 10,
	message: {
		status: 'fail',
		message: 'Terlalu banyak percobaan register. Silakan coba lagi nanti.',
	},
})

// limiter untuk login (sedikit longgar)
const loginLimiter = createRateLimiter({
	windowMs: 15 * 60 * 1000, // 15 menit
	max: 15,
	message: {
		status: 'fail',
		message: 'Terlalu banyak percobaan login. Coba lagi setelah 15 menit.',
	},
})

// POST /api/users -> register
router.post(
	'/register',
	registerLimiter,
	validate(registerSchema),
	checkUniqueUser,
	registerUser
)

// POST /api/users -> login
router.post('/login', loginLimiter, validate(loginSchema), loginUser)

// POST /api/users -> logout
router.post('/logout', logoutUser)

export default router
