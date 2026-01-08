import api from './api'
import { dgerror } from '../utils/logger'

/**
 * Simpan image metadata ke backend
 * @param {Object} payload - { fileId, url, type, width, height, size, mimeType }
 */
export const saveImageMeta = async (payload) => {
	try {
		const res = await api.post('/images/metadata', payload)

		if (!res.data.success) {
			throw res.data
		}

		return res.data.data
	} catch (err) {
		dgerror('[saveImageMeta]', err)
		throw err
	}
}

/**
 * Update status image (temp -> used)
 * Dipanggil ketika story dipublish
 * @param {String} fileId - ImageKit file ID
 * @param {String} storyId - Story ID
 * @param {String} status - 'temp' atau 'used'
 */
export const updateImageStatus = async (fileId, storyId, status = 'used') => {
	try {
		const res = await api.patch(`/images/${fileId}/status`, {
			storyId,
			status,
		})

		if (!res.data.success) {
			throw res.data
		}

		return res.data.data
	} catch (err) {
		dgerror('[updateImageStatus]', err)
		throw err
	}
}

/**
 * Get temp images (untuk cleanup)
 */
export const getTempImages = async () => {
	try {
		const res = await api.get('/images/user/temp')

		if (!res.data.success) {
			throw res.data
		}

		return res.data.data
	} catch (err) {
		dgerror('[getTempImages]', err)
		throw err
	}
}

/**
 * Delete image (ImageKit + DB)
 * Hanya bisa delete temp images
 * @param {String} fileId - ImageKit file ID
 */
export const deleteImage = async (fileId) => {
	try {
		const res = await api.delete(`/images/${fileId}`)

		if (!res.data.success) {
			throw res.data
		}

		return res.data
	} catch (err) {
		dgerror('[deleteImage]', err)
		throw err
	}
}
