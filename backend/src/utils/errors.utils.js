import { ERROR_MESSAGES, ERROR_STATUS_CODES } from '../constants/errors.js'

const createError = (
	code,
	message = null,
	details = null,
	statusCode = null
) => {
	const error = new Error(
		message || ERROR_MESSAGES[code] || 'Terjadi kesalahan yang tidak diketahui.'
	)
	error.code = code
	error.statusCode = statusCode || ERROR_STATUS_CODES[code] || 500
	error.details = details
	return error
}

export { createError }
