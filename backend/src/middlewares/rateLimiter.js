import rateLimit from 'express-rate-limit'
import { errorResponse } from '../utils/response.helpers.js'

/**
 * Membuat rate limiter reusable
 * @param {object} options - konfigurasi custom untuk rate limiter
 * @returns middleware rate limit
 */
export const createRateLimiter = (options = {}) => {
	return rateLimit({
		windowMs: options.windowMs || 15 * 60 * 1000, // default 15 menit
		max: options.max || 10, // default 10 request per window
		message:
			options.message ||
			errorResponse({}, 'Terlalu banyak permintaan, Coba lagi nanti', 400),
		standardHeaders: true,
		legacyHeaders: false,
	})
}
