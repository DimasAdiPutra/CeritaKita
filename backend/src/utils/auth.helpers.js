import jwt from 'jsonwebtoken'

/**
 * Generate JWT token
 * @param {string} userId
 * @returns {string} JWT token
 */
export const generateToken = (userId) => {
	return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
		expiresIn: '1d',
	})
}

/**
 * Set token cookie
 * @param {Response} res
 * @param {string} token
 */
export const setTokenCookie = (res, token) => {
	res.cookie('token', token, {
		httpOnly: true,
		secure: process.env.NODE_ENV === 'production',
		sameSite: 'strict',
		maxAge: 24 * 60 * 60 * 1000, // 1 hari
	})
}

/**
 * Clear token cookie
 * @param {Response} res
 */
export const clearTokenCookie = (res) => {
	res.clearCookie('token', {
		httpOnly: true,
		secure: process.env.NODE_ENV === 'production',
		sameSite: 'strict',
	})
}

/**
 * Format user response data
 * @param {Object} user
 * @returns {Object} formatted user data
 */
export const formatUserResponse = (user) => {
	return {
		id: user._id,
		name: user.name,
		username: user.username,
		email: user.email,
	}
}
