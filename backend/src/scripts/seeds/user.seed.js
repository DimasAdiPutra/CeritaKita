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
		},
	]

	await User.deleteMany()
	const createdUsers = await User.insertMany(users)
	console.log('✅ Users berhasil di-seed')
	return createdUsers
}

export default seedUsers
