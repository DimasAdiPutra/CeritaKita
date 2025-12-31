import { Router } from 'express'
import ImageMeta from '../models/imageMeta.model.js'
import imagekit from '../config/imagekit.js'

const router = Router()

router.post('/metadata', async (req, res) => {
	await ImageMeta.create(req.body)
	res.sendStatus(201)
})

router.delete('/:fileId', async (req, res) => {
	const { fileId } = req.params
	await imagekit.deleteFile(fileId)
	await ImageMeta.deleteOne({ fileId })
	res.sendStatus(204)
})

export default router
