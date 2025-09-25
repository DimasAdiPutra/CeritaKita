import { ERROR_CODES } from '../utils/errors.helper.js'
import { sendResponse } from '../utils/response.helper.js'

export const validate = (schema) => {
	return (req, res, next) => {
		const { error } = schema.validate(req.body, { abortEarly: false })

		if (error) {
			// Format agar sesuai kebutuhan frontend (per field)
			const errors = {}
			error.details.forEach((err) => {
				const field = err.path[0]
				errors[field] = err.message
			})

			return sendResponse(res, {
				code: ERROR_CODES.VALIDATION_ERROR,
				details: { ...errors },
			})
		}

		next()
	}
}
