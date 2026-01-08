// src/services/story.api.js
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
 * PUBLIC (READER)
 * ======================
 */

export const getPublishedStories = async (params = {}) => {
	try {
		const res = await api.get('/stories', {
			params: { status: 'published', ...params },
		})
		return unwrapResponse(res.data)
	} catch (err) {
		dgerror('[getPublishedStories]', err)
		throw err
	}
}

export const getStoryBySlug = async (slug) => {
	try {
		const res = await api.get(`/stories/${slug}`)
		return unwrapResponse(res.data)
	} catch (err) {
		dgerror('[getStoryBySlug]', err)
		throw err
	}
}

/**
 * ======================
 * AUTHOR
 * ======================
 */

export const createStory = async (payload) => {
	try {
		const res = await api.post('/stories', payload)
		return unwrapResponse(res.data)
	} catch (err) {
		dgerror('[createStory]', err)
		throw err
	}
}

export const getMyStories = async () => {
	try {
		const res = await api.get('/stories/me')
		return unwrapResponse(res.data)
	} catch (err) {
		dgerror('[getMyStories]', err)
		throw err
	}
}

export const getStoryById = async (id) => {
	try {
		const res = await api.get(`/stories/draft/${id}`)
		return unwrapResponse(res.data)
	} catch (err) {
		dgerror('[getStoryById]', err)
		throw err
	}
}

export const updateStory = async (id, payload) => {
	try {
		const res = await api.patch(`/stories/${id}`, payload)
		return unwrapResponse(res.data)
	} catch (err) {
		dgerror('[updateStory]', err)
		throw err
	}
}

export const publishStory = async (id) => {
	try {
		const res = await api.post(`/stories/${id}/publish`)
		return unwrapResponse(res.data)
	} catch (err) {
		dgerror('[publishStory]', err)
		throw err
	}
}
