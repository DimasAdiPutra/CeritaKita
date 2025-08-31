import rateLimit from 'express-rate-limit'
import { errorResponse } from '../utils/response.helpers'

/**
 * Create rate limiter dengan konfigurasi custom
 * @param {Object} options
 * @returns {RateLimit} rate limiter middleware
 */
export const createRateLimiter = (options) => {
	return rateLimit({
		windowMs: options.windowMs,
		max: options.max,
		message:
			options.message ||
			errorResponse({}, 'Terlalu banyak permintaan, Coba lagi nanti', 400),
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
	message: errorResponse(
		{},
		'Terlalu banyak percobaan. Coba lagi setelah 10 menit',
		400
	),
})

/**
 * Rate limiter untuk login (sedang)
 */
export const loginRateLimiter = createRateLimiter({
	windowMs: 15 * 60 * 1000, // 15 menit
	max: 10,
	message: errorResponse(
		{},
		'Terlalu banyak percobaan. Coba lagi setelah 5 menit',
		400
	),
	skipSuccessfulRequests: true, // Abaikan jika login berhasil
})
