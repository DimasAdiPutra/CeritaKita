import express from 'express'
import {
	getAllCategories,
	getCategoryById,
	createCategory,
	updateCategory,
	deleteCategory,
} from '../controllers/category.controller.js'
import { authenticate } from '../middlewares/authenticate.js'

const router = express.Router()

// Get all categories
router.get('/', getAllCategories)

// Get category by ID
router.get('/:id', getCategoryById)

// Create new category
router.post('/', authenticate, createCategory)

// Update category
router.patch('/:id', authenticate, updateCategory)

// Delete category
router.delete('/:id', authenticate, deleteCategory)

export default router
