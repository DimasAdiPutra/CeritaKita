import { errorResponse } from '../utils/response.helpers.js'

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

			return res
				.status(400)
				.json(errorResponse(errors, 'Gagal Validasi Input', 400))
		}

		next()
	}
}
