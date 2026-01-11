import User from '../models/user.model.js'
import { verifyTokenHelper } from '../helpers/auth.helper.js'
import { ERROR_CODES } from '../constants/errors.js'
import { sendResponse } from '../utils/response.utils.js'

export const authenticate = async (req, res, next) => {
	try {
		const token = req.cookies?.token

		if (!token) {
			return sendResponse(res, {
				code: ERROR_CODES.UNAUTHORIZED,
				message: 'Authentication required',
			})
		}

		const decoded = verifyTokenHelper(token)
		if (!decoded) {
			return sendResponse(res, {
				code: ERROR_CODES.UNAUTHORIZED,
				message: 'Invalid or expired token',
			})
		}

		const user = await User.findById(decoded.id).select(
			'_id name email avatar role'
		)

		if (!user) {
			return sendResponse(res, {
				code: ERROR_CODES.UNAUTHORIZED,
				message: 'User not found',
			})
		}

		req.user = {
			id: user._id,
			name: user.name,
			role: user.role,
			permissions: decoded.permissions,
		}

		next()
	} catch {
		return sendResponse(res, {
			code: ERROR_CODES.UNAUTHORIZED,
			message: 'Authentication failed',
		})
	}
}
