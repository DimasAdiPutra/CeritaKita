import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import User from '../models/user.model.js'
import { errorResponse, successResponse } from '../utils/response.helpers.js'

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
		const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
			expiresIn: '1d',
		})

		// Simpan token ke cookies (HttpOnly agar lebih aman)
		res.cookie('token', token, {
			httpOnly: true,
			secure: process.env.NODE_ENV === 'production', // hanya https di production
			sameSite: 'strict',
			maxAge: 24 * 60 * 60 * 1000, // 1 hari
		})

		res.status(201).json(
			successResponse(
				{
					user: {
						id: newUser._id,
						name: newUser.name,
						username: newUser.username,
						email: newUser.email,
					},
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

		// Generate JWT
		const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
			expiresIn: '1d',
		})

		// Simpan token ke cookies (HttpOnly agar lebih aman)
		res.cookie('token', token, {
			httpOnly: true,
			secure: process.env.NODE_ENV === 'production', // hanya https di production
			sameSite: 'strict',
			maxAge: 24 * 60 * 60 * 1000, // 1 hari
		})

		res.status(200).json(
			successResponse(
				{
					user: {
						id: user._id,
						name: user.name,
						username: user.username,
						email: user.email,
					},
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

		res.clearCookie('token', {
			httpOnly: true,
			secure: process.env.NODE_ENV === 'production',
			sameSite: 'strict',
		})

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
