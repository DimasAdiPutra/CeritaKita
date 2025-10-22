import { dgerror } from '../utils/logger'
import api from './api'

/**
 * Ambil daftar stories dari API
 * @returns {Promise<Array>} Array of stories
 */
export const getStories = async () => {
	try {
		const res = await api.get('/stories')

		// Cek apakah sukses
		if (!res.data.success) {
			throw new Error(res.data.error || 'Gagal memuat data cerita')
		}

		return res.data.data // kembalikan data saja
	} catch (err) {
		dgerror('[getStories Error]:', err.message)
		throw err // lempar lagi biar komponen tahu ada error
	}
}
