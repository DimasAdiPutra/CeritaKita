// tests/user.test.js
import mongoose from 'mongoose'
import request from 'supertest'
import { MongoMemoryServer } from 'mongodb-memory-server'
import app from '../app.js'
import User from '../models/user.model.js'

let mongoServer
const TIME_OUT = 1000 * 10

// * Test Register
describe('User API Register', () => {
	beforeAll(async () => {
		// Jalankan database MongoDB in-memory
		mongoServer = await MongoMemoryServer.create()
		const uri = mongoServer.getUri()
		await mongoose.connect(uri)
	})

	afterAll(async () => {
		// Bersihkan database setelah test
		await mongoose.connection.dropDatabase()
		await mongoose.connection.close()
		await mongoose.disconnect()
		await mongoServer.stop()
	})

	it(
		'POST /api/auth/register → harus bisa register user baru',
		async () => {
			const res = await request(app).post('/api/auth/register').send({
				name: 'Budi Santoso',
				username: 'budi_santoso',
				email: 'budi@example.com',
				password: 'password123',
			})

			expect(res.statusCode).toBe(201)
			expect(res.body.success).toBe(true)
			expect(res.body.data).toHaveProperty('user')
		},
		TIME_OUT
	)

	it('POST /api/auth/register → harus gagal jika email sudah terdaftar', async () => {
		// Tambah user pertama
		await User.create({
			name: 'Siti Aisyah',
			username: 'siti_aisyah',
			email: 'siti@example.com',
			password: 'password123',
		})

		// Coba daftar lagi dengan email yang sama
		const res = await request(app).post('/api/auth/register').send({
			name: 'Siti Duplikat',
			username: 'siti_duplikat',
			email: 'siti@example.com',
			password: 'password123',
		})

		expect(res.statusCode).toBe(409)
		expect(res.body.success).toBe(false)
		expect(res.body.errors.details.email).toMatch(/Email sudah digunakan/i)
	})

	it('POST /api/auth/register → harus gagal jika username sudah terdaftar', async () => {
		// Tambah user pertama
		await User.create({
			name: 'Agus Pratama',
			username: 'agus_pratama',
			email: 'agus@example.com',
			password: 'password123',
		})

		// Coba daftar lagi dengan username yang sama
		const res = await request(app).post('/api/auth/register').send({
			name: 'Agus Duplikat',
			username: 'agus_pratama',
			email: 'agus2@example.com',
			password: 'password123',
		})

		expect(res.statusCode).toBe(409)
		expect(res.body.success).toBe(false)
		expect(res.body.errors.details.username).toMatch(
			/Username sudah digunakan/i
		)
	})

	it('POST /api/auth/register → harus gagal jika format email salah', async () => {
		const res = await request(app).post('/api/auth/register').send({
			name: 'Joko Widodo',
			username: 'joko_widodo',
			email: 'email_tidak_valid',
			password: 'password123',
		})

		expect(res.statusCode).toBe(422)
		expect(res.body.success).toBe(false)
		expect(res.body.errors.details.email).toMatch(/Format email tidak valid/i)
	})

	it(
		'POST /api/auth/register → harus gagal jika melebihi rate limit',
		async () => {
			for (let i = 0; i < 9; i++) {
				await request(app)
					.post('/api/auth/register')
					.send({
						name: `Test ${i}`,
						username: `user_${i}`,
						email: `user_${i}@example.com`,
						password: 'password123',
					})
			}

			const res = await request(app).post('/api/auth/register').send({
				name: 'Over Limit',
				username: 'over_limit',
				email: 'over_limit@example.com',
				password: 'password123',
			})

			expect(res.statusCode).toBe(429)
			expect(res.body.success).toBe(false)
			expect(res.body.message || res.text).toMatch(/Too many request/i)
		},
		TIME_OUT
	)
})
