// tests/login.test.js
import mongoose from 'mongoose'
import request from 'supertest'
import bcrypt from 'bcryptjs'
import { MongoMemoryServer } from 'mongodb-memory-server'

import app from '../app.js'

import User from '../models/user.model.js'

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
		'POST /api/auth/login → harus berhasil login dengan email dan password benar',
		async () => {
			const res = await request(app).post('/api/auth/login').send({
				email: 'budi_login@example.com',
				password: 'password123',
			})

			expect(res.statusCode).toBe(200)
			expect(res.body.success).toBe(true)
			expect(res.body.data).toHaveProperty('user')
			expect(res.body.data).toHaveProperty('token')
			expect(res.body.data.user.email).toBe('budi_login@example.com')
		},
		TIME_OUT
	)

	it(
		'POST /api/auth/login → harus gagal jika password salah',
		async () => {
			const res = await request(app).post('/api/auth/login').send({
				email: 'budi_login@example.com',
				password: 'password_salah',
			})

			console.log(res.body.errors)

			expect(res.statusCode).toBe(422)
			expect(res.body.success).toBe(false)
			expect(res.body.message).toBe('Invalid email or password')
			expect(res.body.errors).toHaveProperty('code')
			expect(res.body.errors.code).toBe('VALIDATION_ERROR')
		},
		TIME_OUT
	)

	it(
		'POST /api/auth/login → harus gagal jika email tidak terdaftar',
		async () => {
			const res = await request(app).post('/api/auth/login').send({
				email: 'tidakada@example.com',
				password: 'password123',
			})

			expect(res.statusCode).toBe(422)
			expect(res.body.success).toBe(false)
			expect(res.body.message).toBe('Invalid email or password')
			expect(res.body.errors).toHaveProperty('code')
			expect(res.body.errors.code).toBe('VALIDATION_ERROR')
		},
		TIME_OUT
	)

	it(
		'POST /api/auth/login → harus gagal jika melebihi rate limit',
		async () => {
			for (let i = 0; i < 16; i++) {
				await request(app)
					.post('/api/auth/login')
					.send({
						email: `user@example.com`,
						password: `password${i}`,
					})
			}

			const res = await request(app).post('/api/auth/login').send({
				name: 'Over Limit',
				username: 'over_limit',
				email: 'over_limit@example.com',
				password: 'password123',
			})

			expect(res.statusCode).toBe(429)
			expect(res.body.success).toBe(false)
			expect(res.body.message).toMatch(/Too many request/i)
		},
		TIME_OUT
	)
})
