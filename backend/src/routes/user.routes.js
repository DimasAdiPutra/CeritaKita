import express from 'express'
import { registerUser } from '../controllers/user.controller.js'
import { registerSchema } from '../validators/user.validator.js'
import { validate } from '../middlewares/validate.js'
import { checkUniqueUser } from '../middlewares/checkUniqueUser.js'

const router = express.Router()

// POST /api/users
router.post(
	'/register',
	validate(registerSchema),
	checkUniqueUser,
	registerUser
)

export default router
