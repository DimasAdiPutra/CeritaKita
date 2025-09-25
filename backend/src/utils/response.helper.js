import { ERROR_MESSAGES, ERROR_STATUS_CODES } from './errors.helper.js'

const sendResponse = (
	res,
	{
		success = true,
		message = '',
		data = null,
		errors = null,
		statusCode = 200,
		code,
		details = null,
	}
) => {
	// Handle error response dengan code
	if (code) {
		const errorMessage = message || ERROR_MESSAGES[code] || 'Unknown error'
		const errorStatusCode = ERROR_STATUS_CODES[code] || 500

		return res.status(errorStatusCode).json({
			success: false,
			message: errorMessage,
			errors: {
				code,
				...(details && { details }),
			},
			statusCode: errorStatusCode,
		})
	}

	// Handle normal response
	return res.status(statusCode).json({
		success,
		message,
		data,
		errors,
		statusCode,
	})
}

export { sendResponse }
