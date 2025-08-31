// Import package
import bcrypt from 'bcryptjs'

// Import Models
import User from '../models/user.model.js'

// Import Helpers
import { errorResponse, successResponse } from '../utils/response.helpers.js'
import {
	clearTokenCookie,
	formatUserResponse,
	generateToken,
	setTokenCookie,
} from '../utils/auth.helpers.js'

// * REGISTRASI USER
export const registerUser = async (req, res) => {
	try {
		// ✅ Cek apakah sudah ada cookie token
		if (req.cookies.token) {
			return res.status(400).json(
				errorResponse(
					{
						auth: 'Gagal Register',
					},
					'Anda sudah Login, Silahkan Logout terlebih dahulu',
					400
				)
			)
		}

		const { name, username, email, password } = req.body

		// Hash password
		const hashedPassword = await bcrypt.hash(password, 10)

		// Simpan user baru
		const newUser = await User.create({
			name,
			username,
			email,
			password: hashedPassword,
		})

		// Generate token
		const token = generateToken(newUser._id)
		setTokenCookie(res, token)

		res.status(201).json(
			successResponse(
				{
					user: formatUserResponse(newUser),
					token,
				},
				'Berhasil Register',
				201
			)
		)
	} catch (error) {
		console.error('Register Error:', error)

		// Tangani duplikat key error dari MongoDB
		if (error.code === 11000) {
			const field = Object.keys(error.keyPattern)[0]
			return res.status(400).json(
				errorResponse(
					{
						[field]: `${
							field.charAt(0).toUpperCase() + field.slice(1)
						} sudah digunakan`,
					},
					'Gagal Register',
					400
				)
			)
		}

		res.status(500).json(
			errorResponse(
				{
					error,
				},
				'Terjadi kesalahan pada server',
				500
			)
		)
	}
}

// * LOGIN USER
export const loginUser = async (req, res) => {
	try {
		// ✅ Cek apakah sudah ada cookie token
		if (req.cookies.token) {
			return res.status(400).json(
				errorResponse(
					{
						auth: 'Gagal Login',
					},
					'Anda sudah login, Silahkan logout terlebih dahulu',
					400
				)
			)
		}

		const { email, password } = req.body

		// Cari user berdasarkan email atau username
		const user = await User.findOne({
			$or: [{ email }],
		}).select('+password')

		if (!user) {
			return res.status(400).json(
				errorResponse(
					{
						auth: 'Gagal Login',
					},
					'Email atau Password salah',
					400
				)
			)
		}

		// Cek password
		const isMatch = await bcrypt.compare(password, user.password)
		if (!isMatch) {
			return res.status(400).json(
				errorResponse(
					{
						auth: 'Gagal Login',
					},
					'Email atau Password salah',
					400
				)
			)
		}

		// Generate token dan set cookie
		const token = generateToken(user._id)
		setTokenCookie(res, token)

		res.status(200).json(
			successResponse(
				{
					user: formatUserResponse(user),
					token,
				},
				'Berhasil Login'
			)
		)
	} catch (error) {
		console.error('Login Error:', error)
		res.status(500).json(
			errorResponse(
				{
					error,
				},
				'Terjadi kesalahan pada server',
				500
			)
		)
	}
}

// * LOGOUT USER
export const logoutUser = async (req, res) => {
	try {
		// ✅ Cek apakah sudah ada cookie token
		if (!req.cookies.token) {
			return res.status(400).json(
				errorResponse(
					{
						auth: 'Gagal Logout',
					},
					'Anda belum Login, Silahkan Login terlebih dahulu',
					400
				)
			)
		}

		// Clear cookie
		clearTokenCookie(res)

		res.status(200).json(successResponse({}, 'Logout berhasil', 200))
	} catch (error) {
		res.status(500).json(
			errorResponse(
				{
					error,
				},
				'Terjadi kesalahan pada server',
				500
			)
		)
	}
}
