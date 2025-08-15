// tests/user.test.js
import mongoose from 'mongoose'
import request from 'supertest'
import { MongoMemoryServer } from 'mongodb-memory-server'
import app from '../app.js'
import User from '../models/user.model.js'

let mongoServer
const TIME_OUT = 1000 * 10

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

describe('User API', () => {
	it(
		'POST /api/users/register → harus bisa register user baru',
		async () => {
			const res = await request(app).post('/api/users/register').send({
				name: 'Budi Santoso',
				username: 'budi_santoso',
				email: 'budi@example.com',
				password: 'password123',
			})

			expect(res.statusCode).toBe(201)
			expect(res.body.status).toBe('success')
			expect(res.body.data).toHaveProperty('user')
		},
		TIME_OUT
	)

	it('POST /api/users/register → harus gagal jika email sudah terdaftar', async () => {
		// Tambah user pertama
		await User.create({
			name: 'Siti Aisyah',
			username: 'siti_aisyah',
			email: 'siti@example.com',
			password: 'password123',
		})

		// Coba daftar lagi dengan email yang sama
		const res = await request(app).post('/api/users/register').send({
			name: 'Siti Duplikat',
			username: 'siti_duplikat',
			email: 'siti@example.com',
			password: 'password123',
		})

		expect(res.statusCode).toBe(400)
		expect(res.body.status).toBe('fail')
		expect(res.body.errors.email).toMatch(/Email sudah digunakan/i)
	})

	it('POST /api/users/register → harus gagal jika username sudah terdaftar', async () => {
		// Tambah user pertama
		await User.create({
			name: 'Agus Pratama',
			username: 'agus_pratama',
			email: 'agus@example.com',
			password: 'password123',
		})

		// Coba daftar lagi dengan username yang sama
		const res = await request(app).post('/api/users/register').send({
			name: 'Agus Duplikat',
			username: 'agus_pratama',
			email: 'agus2@example.com',
			password: 'password123',
		})

		expect(res.statusCode).toBe(400)
		expect(res.body.status).toBe('fail')
		expect(res.body.errors.username).toMatch(/Username sudah digunakan/i)
	})

	it('POST /api/users/register → harus gagal jika format email salah', async () => {
		const res = await request(app).post('/api/users/register').send({
			name: 'Joko Widodo',
			username: 'joko_widodo',
			email: 'email_tidak_valid',
			password: 'password123',
		})

		expect(res.statusCode).toBe(400)
		expect(res.body.status).toBe('fail')
		expect(res.body.errors.email).toMatch(/Format email tidak valid/i)
	})
})
