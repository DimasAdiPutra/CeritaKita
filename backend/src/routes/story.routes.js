import { Router } from 'express'
import Story from '../models/story.model.js'

import { authenticate } from '../middlewares/authenticate.js'
import { can } from '../middlewares/permissions.js'
import { canEditOwnResource } from '../middlewares/ownership.js'

import { PERMISSIONS } from '../constants/permissions.js'

import {
	getStories,
	getStoryBySlug,
	getStoryById,
	createStory,
	updateStory,
	deleteStory,
	publishStory,
} from '../controllers/story.controller.js'

const router = Router()

/**
 * =========================
 * PROTECTED – DRAFT & ADMIN
 * =========================
 */

// Get draft story (owner / admin)
router.get(
	'/draft/:id',
	authenticate,
	can(PERMISSIONS.STORY_READ_DRAFT),
	canEditOwnResource({
		model: Story,
		bypassPermissions: [PERMISSIONS.STORY_DELETE], // admin
	}),
	getStoryById
)

// Create story
router.post('/', authenticate, can(PERMISSIONS.STORY_CREATE), createStory)

// Update story (owner / admin)
router.patch(
	'/:id',
	authenticate,
	can(PERMISSIONS.STORY_EDIT),
	canEditOwnResource({
		model: Story,
		bypassPermissions: [PERMISSIONS.STORY_DELETE],
	}),
	updateStory
)

// Delete story (admin only)
router.delete('/:id', authenticate, can(PERMISSIONS.STORY_DELETE), deleteStory)

// Publish / Unpublish story (owner / admin)
router.post(
	'/:id/publish',
	authenticate,
	can(PERMISSIONS.STORY_PUBLISH),
	canEditOwnResource({
		model: Story,
		bypassPermissions: [PERMISSIONS.STORY_DELETE],
	}),
	publishStory
)

/**
 * =====================
 * PUBLIC – SEO FRIENDLY
 * =====================
 */

// List published stories
router.get('/', getStories)

// Get story by slug
router.get('/:slug', getStoryBySlug)

export default router
