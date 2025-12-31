import { Router } from 'express'
import imagekit from '../config/imagekit.js'

const router = Router()

router.get('/auth', (req, res) => {
	res.json(imagekit.getAuthenticationParameters())
})

export default router
