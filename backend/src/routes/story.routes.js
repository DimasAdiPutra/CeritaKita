// routes/stories.js
import { Router } from 'express'
import {
	getStories,
	getStoryBySlug,
	createStory,
	updateStory,
	deleteStory,
} from '../controllers/story.controller.js'

const router = Router()

router.get('/', getStories)
router.get('/:slug', getStoryBySlug)
router.post('/', createStory)
router.put('/:slug', updateStory)
router.delete('/:slug', deleteStory)

export default router
