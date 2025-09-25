import rateLimit from 'express-rate-limit'
import { sendResponse } from '../utils/response.helper.js'
import { ERROR_CODES } from '../utils/errors.helper.js'

/**
 * Create rate limiter dengan konfigurasi custom
 * @param {Object} options
 * @returns {RateLimit} rate limiter middleware
 */
export const createRateLimiter = (options) => {
	return rateLimit({
		windowMs: options.windowMs,
		max: options.max,
		handler: (req, res) => {
			// Gunakan handler custom untuk mengirim response yang konsisten
			return sendResponse(res, {
				code: ERROR_CODES.RATE_LIMIT_EXCEEDED,
				details: {
					limit: options.max,
					window: `${options.windowMs / 1000 / 60} minutes`,
					message:
						options.message || 'Too many requests. Please try again later.',
				},
			})
		},
		standardHeaders: true,
		legacyHeaders: false,
		skipSuccessfulRequests: options.skipSuccessfulRequests || false,
	})
}

/**
 * Rate limiter untuk register (ketat)
 */
export const registerRateLimiter = createRateLimiter({
	windowMs: 60 * 60 * 1000, // 1 jam
	max: 5,
	message: 'Too many register experiments.Try again after 1 hour',
})

/**
 * Rate limiter untuk login (sedang)
 */
export const loginRateLimiter = createRateLimiter({
	windowMs: 15 * 60 * 1000, // 15 menit
	max: 10,
	message: 'Too many login experiments.Try again after 15 minutes',
	skipSuccessfulRequests: true, // Abaikan jika login berhasil
})
