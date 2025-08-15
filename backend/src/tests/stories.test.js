import mongoose from 'mongoose'
import request from 'supertest'
import { MongoMemoryServer } from 'mongodb-memory-server'
import app from '../app.js' // Express app utama
import User from '../models/user.model.js'

let mongoServer
let userId

beforeAll(async () => {
	mongoServer = await MongoMemoryServer.create()
	const uri = mongoServer.getUri()

	await mongoose.connect(uri)

	// Buat user dummy
	const user = await User.create({
		name: 'Andi Prasetyo',
		username: 'Andi_Prasetyo',
		email: 'andi@example.com',
		password: 'password123',
	})
	userId = user._id
})

afterAll(async () => {
	await mongoose.connection.dropDatabase()
	await mongoose.connection.close()
	await mongoose.disconnect()
	await mongoServer.stop()
})

describe('Stories API', () => {
	let slug

	it('POST /api/stories → harus bisa membuat story', async () => {
		const res = await request(app)
			.post('/api/stories')
			.send({
				title: 'Cerita Pertama',
				slug: 'cerita-pertama',
				contentJSON: {
					type: 'doc',
					content: [
						{
							type: 'heading',
							attrs: { level: 1 },
							content: [{ type: 'text', text: 'Judul Cerita' }],
						},
						{
							type: 'paragraph',
							content: [
								{ type: 'text', text: 'Ini adalah cerita pertama saya.' },
							],
						},
					],
				},
				contentHTML:
					'<h1>Judul Cerita</h1><p>Ini adalah cerita pertama saya.</p>',
				author: userId.toString(), // pastikan ObjectId string
				tags: ['petualangan', 'fantasi'],
				coverImage:
					'https://ik.imagekit.io/demo/img/tr:w-500,h-500/example.jpg',
			})

		expect(res.statusCode).toBe(201)
		expect(res.body.success).toBe(true)
		expect(res.body.data.slug).toBe('cerita-pertama')
		slug = res.body.data.slug // simpan untuk test berikutnya
	})

	it('GET /api/stories/:slug -> harus mengembalikan detail story berdasarkan slug', async () => {
		// Pastikan slug ini ada di database dummy test
		const res = await request(app).get('/api/stories/cerita-pertama')

		expect(res.statusCode).toBe(200)
		expect(res.body.success).toBe(true)
		expect(res.body.data.slug).toBe('cerita-pertama')
		expect(res.body.data).toHaveProperty('title')
	})

	it('PUT /api/stories/:slug → harus bisa update story', async () => {
		const res = await request(app)
			.put(`/api/stories/${slug}`)
			.send({
				title: 'Cerita Pertama Updated',
				contentJSON: {
					type: 'doc',
					content: [
						{
							type: 'paragraph',
							content: [{ type: 'text', text: 'Konten baru' }],
						},
					],
				},
				contentHTML: '<p>Konten baru</p>',
				tags: ['update', 'testing'],
			})

		expect(res.statusCode).toBe(200)
		expect(res.body.data.title).toBe('Cerita Pertama Updated')
	})

	it('DELETE /api/stories/:slug → harus bisa hapus story', async () => {
		const res = await request(app).delete(`/api/stories/${slug}`)

		expect(res.statusCode).toBe(200)
		expect(res.body.message).toBe('Cerita berhasil dihapus')
	})
})
