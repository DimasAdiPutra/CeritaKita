import bcrypt from 'bcryptjs'
import User from '../../models/user.model.js'

const seedUsers = async () => {
	const users = [
		{
			name: 'Budi Santoso',
			username: 'budi_santoso',
			email: 'budi@example.com',
			password: 'password123',
			avatar:
				'https://ik.imagekit.io/dimasadiputra/Profile3.png?updatedAt=1754112815170',
			bio: 'Penulis cerita fiksi yang gemar bersepeda dan kopi.',
			job: 'Penulis',
			role: 'user',
		},
		{
			name: 'Siti Rahma',
			username: 'siti_rahma123',
			email: 'siti@example.com',
			password: 'rahma456',
			avatar:
				'https://ik.imagekit.io/dimasadiputra/Profile4.png?updatedAt=1754112835660',
			bio: 'Travel blogger yang suka mendaki gunung.',
			job: 'Traveler',
			role: 'user',
		},
		{
			name: 'Andi Wijaya',
			username: 'andiwijaya77',
			email: 'andi@example.com',
			password: 'andi789',
			avatar:
				'https://ik.imagekit.io/dimasadiputra/Profile2.png?updatedAt=1754112799495',
			bio: 'Fotografer jalanan yang senang berbagi kisah visual.',
			job: 'Fotografer',
			role: 'user',
		},
		{
			name: 'Rina Dewi',
			username: 'dewi00',
			email: 'rina@example.com',
			password: 'rinadewi321',
			avatar:
				'https://ik.imagekit.io/dimasadiputra/Profile1.png?updatedAt=1754112776792',
			bio: 'Penulis puisi dan cerpen, penggemar musik klasik.',
			job: 'Penulis',
			role: 'user',
		},
		{
			name: 'admin',
			username: 'admin',
			email: 'admin@ceritakita.com',
			password: 'admin123',
			role: 'admin',
		},
	]

	// hash password satu-satu (async biar scalable)
	const hashedUsers = await Promise.all(
		users.map(async (user) => {
			const salt = await bcrypt.genSalt(10)
			const hashedPassword = await bcrypt.hash(user.password, salt)

			return {
				...user,
				password: hashedPassword,
			}
		})
	)

	await User.deleteMany()
	const createdUsers = await User.insertMany(hashedUsers)

	console.log('✅ Users berhasil di-seed (password aman 🔐)')
	return createdUsers
}

export default seedUsers
