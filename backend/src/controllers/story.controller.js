// controllers/storiesController.js
import Story from '../models/story.model.js'

// GET all stories
export const getStories = async (req, res) => {
	try {
		const stories = await Story.find().sort({ publishedAt: -1 })
		res.json(stories)
	} catch (error) {
		res.status(500).json({ message: 'Gagal mengambil stories', error })
	}
}

// GET story by slug
export const getStoryBySlug = async (req, res) => {
	try {
		const story = await Story.findOne({ slug: req.params.slug })
		if (!story) {
			return res.status(404).json({ message: 'Story tidak ditemukan' })
		}
		res.json(story)
	} catch (error) {
		res.status(500).json({ message: 'Gagal mengambil story', error })
	}
}

// CREATE story
export const createStory = async (req, res) => {
	try {
		const story = new Story(req.body)
		await story.save()
		res.status(201).json(story)
	} catch (error) {
		res.status(400).json({ message: 'Gagal membuat story', error })
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
			return res.status(404).json({ message: 'Story tidak ditemukan' })
		}
		res.json(story)
	} catch (error) {
		res.status(400).json({ message: 'Gagal mengupdate story', error })
	}
}

// DELETE story
export const deleteStory = async (req, res) => {
	try {
		const story = await Story.findOneAndDelete({ slug: req.params.slug })
		if (!story) {
			return res.status(404).json({ message: 'Story tidak ditemukan' })
		}
		res.json({ message: 'Story berhasil dihapus' })
	} catch (error) {
		res.status(500).json({ message: 'Gagal menghapus story', error })
	}
}
