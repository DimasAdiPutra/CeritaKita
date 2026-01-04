import { Router } from 'express'
import imagekit from '../config/imagekit.js'
import { authenticate } from '../middlewares/authenticate.js'

const router = Router()

/**
 * GET ImageKit auth params
 * dipakai frontend untuk upload langsung
 */
router.get('/auth', authenticate, (req, res) => {
	res.json(imagekit.getAuthenticationParameters())
})

export default router
