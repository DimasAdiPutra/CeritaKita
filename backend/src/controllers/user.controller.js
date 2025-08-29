import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import User from '../models/user.model.js'

// * REGISTRASI USER
export const registerUser = async (req, res) => {
	try {
		// ✅ Cek apakah sudah ada cookie token
		if (req.cookies.token) {
			return res.status(400).json({
				status: 'fail',
				message: 'Anda sudah login, silakan logout terlebih dahulu',
			})
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

		res.status(201).json({
			status: 'success',
			data: {
				user: {
					id: newUser._id,
					name: newUser.name,
					username: newUser.username,
					email: newUser.email,
				},
				token,
			},
		})
	} catch (error) {
		console.error('Register Error:', error)

		// Tangani duplikat key error dari MongoDB
		if (error.code === 11000) {
			const field = Object.keys(error.keyPattern)[0]
			return res.status(400).json({
				status: 'fail',
				errors: {
					[field]: `${
						field.charAt(0).toUpperCase() + field.slice(1)
					} sudah digunakan`,
				},
			})
		}

		res.status(500).json({
			status: 'error',
			message: 'Terjadi kesalahan pada server',
		})
	}
}

// * LOGIN USER
export const loginUser = async (req, res) => {
	try {
		// ✅ Cek apakah sudah ada cookie token
		if (req.cookies.token) {
			return res.status(400).json({
				status: 'fail',
				message: 'Anda sudah login, silakan logout terlebih dahulu',
			})
		}

		const { email, password } = req.body

		// Cari user berdasarkan email atau username
		const user = await User.findOne({
			$or: [{ email }],
		}).select('+password')

		if (!user) {
			return res.status(400).json({
				status: 'fail',
				message: 'Email atau Password salah',
			})
		}

		// Cek password
		const isMatch = await bcrypt.compare(password, user.password)
		if (!isMatch) {
			return res.status(400).json({
				status: 'fail',
				message: 'Email atau Password salah',
			})
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

		res.status(200).json({
			status: 'success',
			data: {
				user: {
					id: user._id,
					name: user.name,
					username: user.username,
					email: user.email,
				},
				token,
			},
		})
	} catch (error) {
		console.error('Login Error:', error)
		res.status(500).json({
			status: 'error',
			message: 'Terjadi kesalahan pada server',
		})
	}
}

// * LOGOUT USER
export const logoutUser = async (req, res) => {
	try {
		// ✅ Cek apakah sudah ada cookie token
		if (!req.cookies.token) {
			return res.status(400).json({
				status: 'fail',
				message: 'Anda belum login, silahkan login terlebih dahulu.',
			})
		}

		res.clearCookie('token', {
			httpOnly: true,
			secure: process.env.NODE_ENV === 'production',
			sameSite: 'strict',
		})

		res.status(200).json({
			status: 'success',
			message: 'Logout berhasil',
		})
	} catch (error) {
		res.status(500).json({
			status: 'error',
			message: 'Terjadi kesalahan saat logout',
		})
	}
}
