import { verifyTokenHelper } from '../utils/auth.helpers.js'
import { ERROR_CODES } from '../utils/errors.helper.js'
import { sendResponse } from '../utils/response.helper.js'

/**
 * Middleware untuk memverifikasi JWT dari cookie.
 * Hanya melanjutkan request jika token valid.
 */
export const verifyToken = (req, res, next) => {
	const token = req.cookies.token

	if (!token) {
		return sendResponse(res, { code: ERROR_CODES.INVALID_TOKEN })
	}

	const decoded = verifyTokenHelper(token)
	if (!decoded) {
		return sendResponse(res, { code: ERROR_CODES.INVALID_TOKEN })
	}

	req.user = decoded // Simpan data user di request
	next()
}
