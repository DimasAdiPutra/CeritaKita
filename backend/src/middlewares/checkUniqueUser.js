// middlewares/checkUniqueUser.js
import User from '../models/user.model.js'
import { ERROR_CODES } from '../utils/errors.helper.js'
import { sendResponse } from '../utils/response.helper.js'

export const checkUniqueUser = async (req, res, next) => {
	try {
		const { email, username } = req.body

		const errors = {}

		const existingEmail = await User.findOne({ email })
		if (existingEmail) {
			errors['email'] = 'Email sudah digunakan'
		}

		const existingUsername = await User.findOne({ username })
		if (existingUsername) {
			errors['username'] = 'Username sudah digunakan'
		}

		if ('email' in errors || 'username' in errors) {
			return sendResponse(res, {
				code: ERROR_CODES.DUPLICATE_ENTRY,
				details: { ...errors },
			})
		}

		next()
	} catch (err) {
		next(err)
	}
}
