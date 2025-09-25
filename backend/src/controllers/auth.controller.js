// Import package
import bcrypt from 'bcryptjs'

// Import Models
import User from '../models/user.model.js'

// Import Helpers
import { ERROR_CODES } from '../utils/errors.helper.js'
import { sendResponse } from '../utils/response.helper.js'
import {
	clearTokenCookie,
	formatUserResponse,
	generateToken,
	setTokenCookie,
} from '../utils/auth.helpers.js'

// * REGISTRASI USER
export const registerUser = async (req, res) => {
	try {
		// ✅ Cek apakah sudah ada cookie token
		if (req.cookies.token) {
			return sendResponse(res, { code: ERROR_CODES.ALREADY_AUTHENTICATED })
		}

		const { name, username, email, password } = req.body

		// Hash password
		const hashedPassword = await bcrypt.hash(password, 10)

		// Simpan user baru
		const newUser = await User.create({
			name,
			username,
			email,
			password: hashedPassword,
		})

		// Generate token
		const token = generateToken(newUser._id)
		setTokenCookie(res, token)

		sendResponse(res, {
			message: 'Successfully register',
			data: { user: formatUserResponse(newUser), token },
			statusCode: 201,
		})
	} catch (error) {
		console.error('Register Error:', error)

		// Tangani duplikat key error dari MongoDB
		if (error.code === 11000) {
			const field = Object.keys(error.keyPattern)[0]
			return sendResponse(res, {
				code: ERROR_CODES.USER_ALREADY_EXISTS,
				details: {
					[field]: `${
						field.charAt(0).toUpperCase() + field.slice(1)
					} sudah digunakan`,
				},
			})
		}

		sendResponse(res, {
			code: ERROR_CODES.INTERNAL_SERVER_ERROR,
			details: { ...error },
		})
	}
}

// * LOGIN USER
export const loginUser = async (req, res) => {
	try {
		// ✅ Cek apakah sudah ada cookie token
		if (req.cookies.token) {
			return sendResponse(res, { code: ERROR_CODES.ALREADY_AUTHENTICATED })
		}

		const { email, password } = req.body

		// Cari user berdasarkan email atau username
		const user = await User.findOne({
			$or: [{ email }],
		}).select('+password')

		if (!user) {
			return sendResponse(res, {
				code: ERROR_CODES.VALIDATION_ERROR,
				message: 'Email atau password salah.',
			})
		}

		// Cek password
		const isMatch = await bcrypt.compare(password, user.password)
		if (!isMatch) {
			return sendResponse(res, {
				code: ERROR_CODES.VALIDATION_ERROR,
				message: 'Email atau password salah.',
			})
		}

		// Generate token dan set cookie
		const token = generateToken(user._id)
		setTokenCookie(res, token)

		sendResponse(res, {
			data: { user: formatUserResponse(user), token },
			message: 'Successfully logged in',
		})
	} catch (error) {
		console.error('Login Error:', error)
		sendResponse(res, {
			code: ERROR_CODES.INTERNAL_SERVER_ERROR,
			details: { ...error },
		})
	}
}

// * LOGOUT USER
export const logoutUser = async (req, res) => {
	try {
		// Clear cookie
		clearTokenCookie(res)

		sendResponse(res, {
			message: 'You have been logged out successfully',
			data: { loggedOut: true, timestamp: new Date().toISOString },
		})
	} catch (error) {
		sendResponse(res, {
			code: ERROR_CODES.INTERNAL_SERVER_ERROR,
			details: { ...error },
		})
	}
}
