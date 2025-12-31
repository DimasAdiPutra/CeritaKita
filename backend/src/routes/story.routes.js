import { Router } from 'express'
import {
	getStories,
	getStoryBySlug,
	createStory,
	updateStory,
	deleteStory,
	publishStory,
} from '../controllers/story.controller.js'

import { authenticate } from '../middlewares/authenticate.js'

const router = Router()

/**
 * PUBLIC
 */
router.get('/', getStories)
router.get('/:slug', getStoryBySlug)

/**
 * PROTECTED
 */
router.post('/', authenticate, createStory)
router.patch('/:id', authenticate, updateStory)
router.delete('/:id', authenticate, deleteStory)
router.post('/:id/publish', authenticate, publishStory)

export default router
