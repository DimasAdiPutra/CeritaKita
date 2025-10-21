import { dgerror } from '@/utils/logger'
import api from './api'

/**
 * Registrasi user baru
 * @param {Object} payload - Data registrasi (name, email, password, dll)
 * @returns {Promise<Object>} Respons dari server
 */
export const registerUser = async (payload) => {
	try {
		const res = await api.post('/auth/register', payload)

		if (!res.data.success) {
			throw new Error(res.data.message || 'Gagal registrasi user')
		}

		return res.data
	} catch (err) {
		dgerror('[registerUser Error]:', err.response?.data || err.message)
		if (err.response) {
			return err.response.data
		}
		throw err
	}
}

/**
 * Login user
 * @param {Object} payload - Data login (email dan password)
 * @returns {Promise<Object>} Respons dari server
 */
export const loginUser = async (payload) => {
	try {
		const res = await api.post('/auth/login', payload)

		if (!res.data.success) {
			throw new Error(res.data.message || 'Gagal login user')
		}

		return res.data
	} catch (err) {
		dgerror('[loginUser Error]:', err.response?.data || err.message)
		if (err.response) {
			return err.response.data
		}
		throw err
	}
}

/**
 * Logout user
 * @returns {Promise<Object>} Respons dari server
 */
export const logoutUser = async () => {
	try {
		const res = await api.post('/auth/logout')

		if (!res.data.success) {
			throw new Error(res.data.message || 'Gagal logout user')
		}

		return res.data
	} catch (err) {
		dgerror('[logoutUser Error]:', err.response?.data || err.message)
		if (err.response) {
			return err.response.data
		}
		throw err
	}
}

/**
 * Mengecek status login user berdasarkan JWT di cookie
 * Digunakan di frontend untuk update UI (misal: navbar)
 * @returns {Promise<Object>} { loggedIn: boolean, user: object|null }
 */
export const checkUser = async () => {
	try {
		const res = await api.get('/auth/check')

		if (!res.data.success) {
			throw new Error(res.data.message || 'Gagal memverifikasi user')
		}

		return res.data
	} catch (err) {
		dgerror('[checkUser Error]:', err.response?.data || err.message)
		return err.response.data.errors.details // fallback aman agar UI tidak crash
	}
}
