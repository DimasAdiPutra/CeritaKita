import Story from '../models/story.model.js'
import { ERROR_CODES } from '../utils/errors.helper.js'
import { sendResponse } from '../utils/response.helper.js'
import { generateStorySlug } from '../utils/slug.helper.js'

/**
 * GET all published stories
 */
export const getStories = async (req, res) => {
	try {
		const stories = await Story.find({ status: 'published' })
			.sort({ publishedAt: -1 })
			.select(
				'title slug excerpt coverImage author status publishedAt views likes'
			)
			.populate('author', 'name avatar job')

		sendResponse(res, {
			data: stories,
			message: 'Stories retrieved successfully',
		})
	} catch (error) {
		sendResponse(res, {
			code: ERROR_CODES.INTERNAL_SERVER_ERROR,
			details: error.message,
		})
	}
}

/**
 * GET story by slug (published only)
 */
export const getStoryBySlug = async (req, res) => {
	try {
		const story = await Story.findOneAndUpdate(
			{ slug: req.params.slug, status: 'published' },
			{ $inc: { views: 1 } },
			{ new: true }
		)
			.select(
				'title slug coverImage contentHTML status author publishedAt views'
			)
			.populate('author', 'name avatar')

		if (!story) {
			return sendResponse(res, {
				code: ERROR_CODES.NOT_FOUND,
				message: 'Story not found',
			})
		}

		sendResponse(res, {
			data: story,
			message: 'Story retrieved successfully',
		})
	} catch (error) {
		sendResponse(res, {
			code: ERROR_CODES.INTERNAL_SERVER_ERROR,
			details: error.message,
		})
	}
}

/**
 * CREATE story (draft)
 */
export const createStory = async (req, res) => {
	try {
		const {
			title,
			excerpt = '',
			contentHTML,
			contentJSON,
			tags = [],
			coverImage, // optional, object sesuai imageMetaSchema
		} = req.body

		// Validasi required fields
		if (!title || !contentHTML || !contentJSON) {
			return sendResponse(res, {
				code: ERROR_CODES.VALIDATION_ERROR,
				message: 'Required fields missing',
			})
		}

		// Generate slug otomatis
		const slug = await generateStorySlug(title, Story)

		// Create story
		const story = await Story.create({
			title,
			slug,
			excerpt,
			contentHTML,
			contentJSON,
			tags,
			coverImage: coverImage || null,
			author: req.user.id,
			status: 'draft',
		})

		sendResponse(res, {
			statusCode: 201,
			data: story,
			message: 'Story created as draft',
		})
	} catch (error) {
		sendResponse(res, {
			code: ERROR_CODES.INTERNAL_SERVER_ERROR,
			details: error.message,
		})
	}
}

/**
 * PUBLISH story (owner only)
 */
export const publishStory = async (req, res) => {
	try {
		const story = await Story.findOne({
			_id: req.params.id,
			author: req.user.id,
		})

		if (!story) {
			return sendResponse(res, {
				code: ERROR_CODES.NOT_FOUND,
				message: 'Story not found or unauthorized',
			})
		}

		if (story.status === 'published') {
			return sendResponse(res, {
				code: ERROR_CODES.BAD_REQUEST,
				message: 'Story already published',
			})
		}

		// Validasi minimal sebelum publish
		if (!story.title || !story.contentHTML || !story.contentJSON) {
			return sendResponse(res, {
				code: ERROR_CODES.VALIDATION_ERROR,
				message: 'Story content is incomplete',
			})
		}

		story.status = 'published'
		story.publishedAt = new Date()

		await story.save()

		sendResponse(res, {
			message: 'Story published successfully',
			data: {
				slug: story.slug,
				publishedAt: story.publishedAt,
			},
		})
	} catch (error) {
		sendResponse(res, {
			code: ERROR_CODES.INTERNAL_SERVER_ERROR,
			details: error.message,
		})
	}
}

/**
 * EDIT story (owner only)
 * Author mengedit draft / story mereka → pakai _id
 */
export const updateStory = async (req, res) => {
	try {
		const story = await Story.findOne({
			_id: req.params.id, // pakai _id untuk edit
			author: req.user.id,
		})

		if (!story) {
			return sendResponse(res, {
				code: ERROR_CODES.NOT_FOUND,
				message: 'Story not found or unauthorized',
			})
		}

		// Lock critical fields jika sudah published
		if (story.status === 'published') {
			delete req.body.title
			delete req.body.slug
			delete req.body.author
			delete req.body.publishedAt
		} else {
			// Jika draft, slug mengikuti judul
			if ('title' in req.body && req.body.title !== story.title) {
				story.slug = await generateStorySlug(req.body.title, Story)
			}
		}

		// Prevent status change via PATCH biasa
		if ('status' in req.body) {
			return sendResponse(res, {
				code: ERROR_CODES.FORBIDDEN,
				message: 'Use publish endpoint to publish story',
			})
		}

		// Ensure contentHTML & contentJSON updated together
		const hasHTML = 'contentHTML' in req.body
		const hasJSON = 'contentJSON' in req.body
		if (hasHTML !== hasJSON) {
			return sendResponse(res, {
				code: ERROR_CODES.VALIDATION_ERROR,
				message: 'contentHTML and contentJSON must be updated together',
			})
		}

		// Allowed fields only
		const ALLOWED_FIELDS = [
			'title',
			'excerpt',
			'contentHTML',
			'contentJSON',
			'coverImage',
			'tags',
		]

		ALLOWED_FIELDS.forEach((field) => {
			if (req.body[field] !== undefined) {
				story[field] = req.body[field]
			}
		})

		await story.save()

		sendResponse(res, {
			data: story,
			message: 'Story updated successfully',
		})
	} catch (error) {
		sendResponse(res, {
			code: ERROR_CODES.INTERNAL_SERVER_ERROR,
			details: error.message,
		})
	}
}

/**
 * DELETE story (owner only)
 */
export const deleteStory = async (req, res) => {
	try {
		const story = await Story.findOneAndDelete({
			_id: req.params.id,
			author: req.user.id,
		})

		if (!story) {
			return sendResponse(res, {
				code: ERROR_CODES.NOT_FOUND,
				message: 'Story not found or unauthorized',
			})
		}

		sendResponse(res, {
			message: 'Story deleted successfully',
		})
	} catch (error) {
		sendResponse(res, {
			code: ERROR_CODES.INTERNAL_SERVER_ERROR,
			details: error.message,
		})
	}
}
