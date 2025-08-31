import Story from '../models/story.model.js'
import { errorResponse, successResponse } from '../utils/response.helpers.js'

// GET all stories
export const getStories = async (req, res) => {
	try {
		const stories = await Story.find()
			.sort({ publishedAt: -1 })
			.populate('author', 'name avatar job')

		res.json(successResponse(stories, 'Berhasil mengambil Cerita'))
	} catch (error) {
		res
			.status(500)
			.json(errorResponse(error, 'Terjadi kesalahan pada server', 500))
	}
}

// GET story by slug
export const getStoryBySlug = async (req, res) => {
	try {
		const story = await Story.findOne({ slug: req.params.slug })
			.select('title slug contentHTML author publishedAt')
			.populate('author', 'name avatar')
		if (!story) {
			return res.status(404).json(
				errorResponse(
					{
						story: `Cerita ${req.params.slug} tidak ditemukan`,
					},
					'Cerita tidak di temukan',
					404
				)
			)
		}
		res.json(successResponse(story, 'Cerita berhasil di temukan'))
	} catch (error) {
		res
			.status(500)
			.json(errorResponse(error, 'Terjadi kesalahan pada server', 500))
	}
}

// CREATE story
export const createStory = async (req, res) => {
	try {
		const story = new Story(req.body)
		await story.save()
		res.status(201).json(successResponse(story, 'Berhasil membuat Cerita'))
	} catch (error) {
		res
			.status(400)
			.json(errorResponse(error, 'Terjadi kesalahan pada server', 400))
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
			return res
				.status(404)
				.json(
					errorResponse({}, `Cerita ${req.params.slug} tidak di temukan`, 404)
				)
		}
		res.json(successResponse(story, 'Berhasil mengupdate Cerita'))
	} catch (error) {
		res
			.status(400)
			.json(errorResponse(error, 'Terjadi kesalahan pada server', 400))
	}
}

// DELETE story
export const deleteStory = async (req, res) => {
	try {
		const story = await Story.findOneAndDelete({ slug: req.params.slug })
		if (!story) {
			return res
				.status(404)
				.json(
					errorResponse({}, `Cerita ${req.params.slug} tidak ditemukan`, 404)
				)
		}
		res.json(successResponse({}, 'Cerita berhasil dihapus'))
	} catch (error) {
		res
			.status(500)
			.json(errorResponse(error, 'Terjadi kesalahan pada server', 500))
	}
}
