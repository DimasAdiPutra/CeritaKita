/**
 * Format success response
 * @param {any} data - Data yang akan dikirim
 * @param {number} statusCode - HTTP status code (default: 200)
 * @returns {Object} Formatted response
 */
export const successResponse = (data = {}, message = '', statusCode = 200) => {
	return {
		status: 'success',
		data,
		message,
		statusCode,
		timestamp: new Date().toISOString(),
	}
}

/**
 * Format error response (untuk server/general errors)
 * @param {string} message - Error message
 * @param {number} statusCode - HTTP status code (default: 500)
 * @returns {Object} Formatted response
 */
export const errorResponse = (errors = {}, message = '', statusCode = 500) => {
	return {
		status: 'error',
		errors,
		message,
		statusCode,
		timestamp: new Date().toISOString(),
	}
}
