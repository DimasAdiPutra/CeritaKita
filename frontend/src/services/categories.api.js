import api from './api'
import { dgerror } from '../utils/logger'

/**
 * Helper biar konsisten
 */
const unwrapResponse = (res) => {
	if (!res.success) {
		throw res
	}
	return res.data
}

/**
 * ======================
 * PUBLIC
 * ======================
 */

export const getCategories = async (params = {}) => {
	try {
		const res = await api.get('/categories', { params })
		return unwrapResponse(res.data)
	} catch (err) {
		dgerror('[getCategories]', err)
		throw err
	}
}

export const getCategoryById = async (id) => {
	try {
		const res = await api.get(`/categories/${id}`)
		return unwrapResponse(res.data)
	} catch (err) {
		dgerror('[getCategoryById]', err)
		throw err
	}
}

/**
 * ======================
 * ADMIN / SYSTEM
 * ======================
 */

export const createCategory = async (payload) => {
	try {
		const res = await api.post('/categories', payload)
		return unwrapResponse(res.data)
	} catch (err) {
		dgerror('[createCategory]', err)
		throw err
	}
}

export const updateCategory = async (id, payload) => {
	try {
		const res = await api.patch(`/categories/${id}`, payload)
		return unwrapResponse(res.data)
	} catch (err) {
		dgerror('[updateCategory]', err)
		throw err
	}
}

export const deleteCategory = async (id) => {
	try {
		const res = await api.delete(`/categories/${id}`)
		return unwrapResponse(res.data)
	} catch (err) {
		dgerror('[deleteCategory]', err)
		throw err
	}
}
