// controllers/storiesController.js
import Story from '../models/story.model.js'

// GET all stories
export const getStories = async (req, res) => {
	try {
		const stories = await Story.find()
			.sort({ publishedAt: -1 })
			.populate('author', 'name avatar job')
		res.json({
			success: true,
			message: 'Berhasil mengambil stories',
			data: stories,
		})
	} catch (error) {
		res
			.status(500)
			.json({ success: false, message: 'Gagal mengambil stories', error })
	}
}

// GET story by slug
export const getStoryBySlug = async (req, res) => {
	try {
		const story = await Story.findOne({ slug: req.params.slug })
			.select('title slug contentHTML author publishedAt')
			.populate('author', 'name avatar')
		if (!story) {
			return res.status(404).json({
				success: false,
				message: 'Story tidak ditemukan',
			})
		}
		res.json({
			success: true,
			message: 'Story berhasil di temukan',
			data: story,
		})
	} catch (error) {
		res
			.status(500)
			.json({ success: false, message: 'Gagal mengambil story', error })
	}
}

// CREATE story
export const createStory = async (req, res) => {
	try {
		const story = new Story(req.body)
		await story.save()
		res.status(201).json({
			success: true,
			message: 'Berhasil membuat story',
			data: story,
		})
	} catch (error) {
		res
			.status(400)
			.json({ success: false, message: 'Gagal membuat story', error })
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
				.json({ success: false, message: 'Story tidak ditemukan' })
		}
		res.json({
			success: true,
			message: 'Berhasil mengupdate story',
			data: story,
		})
	} catch (error) {
		res
			.status(400)
			.json({ success: false, message: 'Gagal mengupdate story', error })
	}
}

// DELETE story
export const deleteStory = async (req, res) => {
	try {
		const story = await Story.findOneAndDelete({ slug: req.params.slug })
		if (!story) {
			return res
				.status(404)
				.json({ success: false, message: 'Story tidak ditemukan' })
		}
		res.json({ success: true, message: 'Story berhasil dihapus' })
	} catch (error) {
		res
			.status(500)
			.json({ success: false, message: 'Gagal menghapus story', error })
	}
}
