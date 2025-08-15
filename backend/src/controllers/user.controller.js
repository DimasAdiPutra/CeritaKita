import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import User from '../models/user.model.js'

export const registerUser = async (req, res) => {
	try {
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
