import Story from '../models/story.model.js'
import { ERROR_CODES } from '../utils/errors.helper.js'
import { sendResponse } from '../utils/response.helper.js'
import { generateStorySlug } from '../utils/slug.helper.js'

// GET all stories
export const getStories = async (req, res) => {
	try {
		const stories = await Story.find()
			.sort({ publishedAt: -1 })
			.populate('author', 'name avatar job')

		sendResponse(res, {
			data: stories,
			message: 'Story retrieved successfully',
		})
	} catch (error) {
		sendResponse(res, {
			code: ERROR_CODES.INTERNAL_SERVER_ERROR,
			details: { ...error },
		})
	}
}

// GET story by slug
export const getStoryBySlug = async (req, res) => {
	try {
		const story = await Story.findOne({ slug: req.params.slug })
			.select('title slug contentHTML author publishedAt')
			.populate('author', 'name avatar')
		if (!story) {
			return sendResponse(res, {
				code: ERROR_CODES.NOT_FOUND,
				message: `Story not found`,
			})
		}

		sendResponse(res, { data: story, message: 'Story retrieved successfully' })
		// res.json(successResponse(story, 'Cerita berhasil di temukan'))
	} catch (error) {
		sendResponse(res, {
			code: ERROR_CODES.INTERNAL_SERVER_ERROR,
			details: { ...error },
		})
	}
}

// CREATE story
export const createStory = async (req, res, next) => {
	try {
		const { title, ...otherData } = req.body

		// Validasi input
		if (!title) {
			return sendResponse(res, {
				code: 'VALIDATION_ERROR',
				message: 'Title and content are required',
				details: {
					...(title ? {} : { title: ['Title is required'] }),
				},
			})
		}

		// Generate slug otomatis
		const slug = await generateStorySlug(title, Story)

		// Buat story
		const story = new Story({
			title,
			slug,
			...otherData,
		})

		await story.save()

		sendResponse(res, {
			success: true,
			message: 'Story created successfully',
			data: story,
			statusCode: 201,
		})
	} catch (error) {
		next(error)
	}
}

// UPDATE story
export const updateStory = async (req, res) => {
	try {
		const story = await Story.findOneAndUpdate(
			{ slug: req.params.slug },
			req.body,
			{ new: true }
		)
		if (!story) {
			return sendResponse(res, {
				code: ERROR_CODES.NOT_FOUND,
				message: 'Story not found',
			})
		}

		sendResponse(res, { data: story, message: 'Story updated successfully' })
		// res.json(successResponse(story, 'Berhasil mengupdate Cerita'))
	} catch (error) {
		sendResponse(res, {
			code: ERROR_CODES.INTERNAL_SERVER_ERROR,
			details: { ...error },
		})
	}
}

// DELETE story
export const deleteStory = async (req, res) => {
	try {
		const story = await Story.findOneAndDelete({ slug: req.params.slug })
		if (!story) {
			return sendResponse(res, {
				code: ERROR_CODES.NOT_FOUND,
				message: 'Story not found',
			})
		}

		sendResponse(res, { message: 'Successfully deleted story' })
		// res.json(successResponse({}, 'Cerita berhasil dihapus'))
	} catch (error) {
		sendResponse(res, {
			code: ERROR_CODES.INTERNAL_SERVER_ERROR,
			details: { ...error },
		})
	}
}
