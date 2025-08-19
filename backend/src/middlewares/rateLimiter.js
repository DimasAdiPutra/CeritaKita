import rateLimit from 'express-rate-limit'

/**
 * Membuat rate limiter reusable
 * @param {object} options - konfigurasi custom untuk rate limiter
 * @returns middleware rate limit
 */
export const createRateLimiter = (options = {}) => {
	return rateLimit({
		windowMs: options.windowMs || 15 * 60 * 1000, // default 15 menit
		max: options.max || 10, // default 10 request per window
		message: options.message || {
			status: 'fail',
			message: 'Terlalu banyak permintaan, coba lagi nanti.',
		},
		standardHeaders: true,
		legacyHeaders: false,
	})
}
