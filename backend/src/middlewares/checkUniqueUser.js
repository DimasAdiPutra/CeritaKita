// middlewares/checkUniqueUser.js
import User from '../models/user.model.js'

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
			return res.status(400).json({
				status: 'fail',
				errors,
			})
		}

		next()
	} catch (err) {
		next(err)
	}
}
