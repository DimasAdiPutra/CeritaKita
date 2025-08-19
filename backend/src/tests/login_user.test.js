// tests/login.test.js
import mongoose from 'mongoose'
import request from 'supertest'
import { MongoMemoryServer } from 'mongodb-memory-server'
import app from '../app.js'
import User from '../models/user.model.js'
import bcrypt from 'bcryptjs'

let mongoServer
const TIME_OUT = 1000 * 10

// * Test Login
describe('User API Login', () => {
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

	beforeEach(async () => {
		// Buat user dummy untuk keperluan login
		const hashedPassword = await bcrypt.hash('password123', 10)
		await User.create({
			name: 'Budi Login',
			username: 'budi_login',
			email: 'budi_login@example.com',
			password: hashedPassword,
		})
	})

	afterEach(async () => {
		await User.deleteMany({})
	})

	it(
		'POST /api/users/login → harus berhasil login dengan email dan password benar',
		async () => {
			const res = await request(app).post('/api/users/login').send({
				email: 'budi_login@example.com',
				password: 'password123',
			})

			expect(res.statusCode).toBe(200)
			expect(res.body.status).toBe('success')
			expect(res.body.data).toHaveProperty('user')
			expect(res.body.data).toHaveProperty('token')
			expect(res.body.data.user.email).toBe('budi_login@example.com')
		},
		TIME_OUT
	)

	it(
		'POST /api/users/login → harus gagal jika password salah',
		async () => {
			const res = await request(app).post('/api/users/login').send({
				email: 'budi_login@example.com',
				password: 'password_salah',
			})

			expect(res.statusCode).toBe(400)
			expect(res.body.status).toBe('fail')
			expect(res.body.errors).toHaveProperty('password')
		},
		TIME_OUT
	)

	it(
		'POST /api/users/login → harus gagal jika email tidak terdaftar',
		async () => {
			const res = await request(app).post('/api/users/login').send({
				email: 'tidakada@example.com',
				password: 'password123',
			})

			expect(res.statusCode).toBe(400)
			expect(res.body.status).toBe('fail')
			expect(res.body.errors).toHaveProperty('email')
		},
		TIME_OUT
	)

	it(
		'POST /api/users/login → harus gagal jika melebihi rate limit',
		async () => {
			for (let i = 0; i < 16; i++) {
				await request(app)
					.post('/api/users/login')
					.send({
						email: `user@example.com`,
						password: `password${i}`,
					})
			}

			const res = await request(app).post('/api/users/login').send({
				name: 'Over Limit',
				username: 'over_limit',
				email: 'over_limit@example.com',
				password: 'password123',
			})

			expect(res.statusCode).toBe(429)
			expect(res.body.status).toBe('fail')
			expect(res.body.message || res.text).toMatch(/Terlalu banyak percobaan/i)
		},
		TIME_OUT
	)
})
