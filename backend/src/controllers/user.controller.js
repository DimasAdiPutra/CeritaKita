import User from '../models/user.model.js'
import bcrypt from 'bcryptjs'

export const createUser = async (req, res) => {
	try {
		const { name, email, password, avatar, bio } = req.body

		const hashedPassword = await bcrypt.hash(password, 10)

		const user = new User({
			name,
			email,
			password: hashedPassword,
			avatar,
			bio,
		})

		const savedUser = await user.save()
		res.status(201).json({
			success: true,
			message: 'User berhasil dibuat',
			user: savedUser,
		})
	} catch (error) {
		res.status(400).json({
			success: false,
			message: 'Gagal membuat user',
			error: error.message,
		})
	}
}
