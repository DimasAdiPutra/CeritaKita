import { ERROR_CODES } from '../constants/errors.js'
import { sendResponse } from '../utils/response.utils.js'

/**
 * Ownership middleware (reusable)
 *
 * @param {Object} options
 * @param {MongooseModel} options.model        - Model mongoose
 * @param {string} options.paramKey            - req.params key (default: 'id')
 * @param {string} options.ownerField          - field owner di document (default: 'author')
 * @param {string[]} options.bypassPermissions - permission yang boleh bypass ownership
 */
export const canEditOwnResource = ({
	model,
	paramKey = 'id',
	ownerField = 'author',
	bypassPermissions = [],
}) => {
	return async (req, res, next) => {
		try {
			const resourceId = req.params[paramKey]

			const resource = await model.findById(resourceId)
			if (!resource) {
				return sendResponse(res, {
					code: ERROR_CODES.NOT_FOUND,
					message: 'Story not found',
				})
			}

			// Superadmin / permission bypass
			if (req.user?.permissions?.some((p) => bypassPermissions.includes(p))) {
				req.resource = resource
				return next()
			}

			const ownerId = resource[ownerField]?.toString()
			if (ownerId != req.user.id) {
				return sendResponse(res, {
					code: ERROR_CODES.INSUFFICIENT_PERMISSION,
				})
			}

			req.resource = resource // optional, biar nggak query ulang
			next()
		} catch (error) {
			next(error)
		}
	}
}
