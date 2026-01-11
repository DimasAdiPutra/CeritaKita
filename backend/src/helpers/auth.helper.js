import jwt from 'jsonwebtoken'
import { ROLES } from '../constants/roles.js'

/**
 * Generate JWT token
 * @param {string} userId
 * @returns {string} JWT token
 */
export const generateToken = (user) => {
	const permissions = ROLES[user.role]

	return jwt.sign(
		{
			id: user._id,
			role: user.role,
			permissions,
		},
		process.env.JWT_SECRET,
		{ expiresIn: '1d' }
	)
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
 * Verifikasi JWT token.
 * @param {string} token - Token JWT dari cookie.
 * @returns {Object|null} - Data decoded jika valid, null jika tidak valid.
 */
export const verifyTokenHelper = (token) => {
	if (!token) return null

	try {
		return jwt.verify(token, process.env.JWT_SECRET)
	} catch {
		return null
	}
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
