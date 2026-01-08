import { Router } from 'express'
import ImageMeta from '../models/imageMeta.model.js'
import imagekit from '../config/imagekit.js'
import { authenticate } from '../middlewares/authenticate.js'
import { sendResponse } from '../utils/response.helper.js'
import { ERROR_CODES } from '../utils/errors.helper.js'

const router = Router()

/**
 * SAVE image metadata
 */
router.post('/metadata', authenticate, async (req, res) => {
	try {
		const { fileId, url, type, width, height, size, mimeType } = req.body

		// Validasi required fields
		if (!fileId || !url || !type) {
			return sendResponse(res, {
				code: ERROR_CODES.BAD_REQUEST,
				details: 'fileId, url, dan type harus diisi',
			})
		}

		// Validasi type
		if (!['cover', 'embed'].includes(type)) {
			return sendResponse(res, {
				code: ERROR_CODES.BAD_REQUEST,
				details: 'Type harus "cover" atau "embed"',
			})
		}

		const meta = await ImageMeta.create({
			fileId,
			url,
			type,
			width,
			height,
			size,
			mimeType,
			userId: req.user.id,
			status: 'temp',
		})

		sendResponse(res, {
			statusCode: 201,
			message: 'Image metadata saved',
			data: meta,
		})
	} catch (error) {
		sendResponse(res, {
			code: ERROR_CODES.INTERNAL_SERVER_ERROR,
			details: error.message,
		})
	}
})

/**
 * UPDATE image status to 'used' (ketika story dipublish)
 */
router.patch('/:fileId/status', authenticate, async (req, res) => {
	try {
		const { fileId } = req.params
		const { storyId, status } = req.body

		// Validasi status
		if (!status || !['temp', 'used'].includes(status)) {
			return sendResponse(res, {
				code: ERROR_CODES.BAD_REQUEST,
				details: 'Status harus "temp" atau "used"',
			})
		}

		const imageMeta = await ImageMeta.findOne({ fileId, userId: req.user.id })

		if (!imageMeta) {
			return sendResponse(res, {
				code: ERROR_CODES.NOT_FOUND,
				details: 'Image tidak ditemukan',
			})
		}

		// Update status
		imageMeta.status = status
		if (status === 'used' && storyId) {
			imageMeta.storyId = storyId
			imageMeta.usedAt = new Date()
		}

		await imageMeta.save()

		sendResponse(res, {
			statusCode: 200,
			message: `Image status updated to ${status}`,
			data: imageMeta,
		})
	} catch (error) {
		sendResponse(res, {
			code: ERROR_CODES.INTERNAL_SERVER_ERROR,
			details: error.message,
		})
	}
})

/**
 * GET images by user (untuk cleanup temp images)
 */
router.get('/user/temp', authenticate, async (req, res) => {
	try {
		const images = await ImageMeta.find({
			userId: req.user.id,
			status: 'temp',
		}).sort({ createdAt: -1 })

		sendResponse(res, {
			statusCode: 200,
			message: 'Temp images retrieved',
			data: images,
		})
	} catch (error) {
		sendResponse(res, {
			code: ERROR_CODES.INTERNAL_SERVER_ERROR,
			details: error.message,
		})
	}
})

/**
 * DELETE image (ImageKit + DB)
 * Hanya bisa delete image milik user sendiri
 */
router.delete('/:fileId', authenticate, async (req, res) => {
	try {
		const { fileId } = req.params

		const imageMeta = await ImageMeta.findOne({ fileId, userId: req.user.id })

		if (!imageMeta) {
			return sendResponse(res, {
				code: ERROR_CODES.NOT_FOUND,
				details: 'Image tidak ditemukan',
			})
		}

		// Jangan hapus image yang sudah used
		if (imageMeta.status === 'used') {
			return sendResponse(res, {
				code: ERROR_CODES.BAD_REQUEST,
				details: 'Tidak bisa menghapus image yang sudah digunakan di story',
			})
		}

		// Delete dari ImageKit
		try {
			await imagekit.deleteFile(fileId)
		} catch (ikError) {
			console.error('ImageKit delete error:', ikError)
		}

		// Delete dari DB
		await ImageMeta.deleteOne({ fileId })

		sendResponse(res, {
			statusCode: 204,
			message: 'Image deleted',
		})
	} catch (error) {
		sendResponse(res, {
			code: ERROR_CODES.INTERNAL_SERVER_ERROR,
			details: error.message,
		})
	}
})

export default router
