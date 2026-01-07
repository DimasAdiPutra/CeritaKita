import mongoose from 'mongoose'
import dotenv from 'dotenv'
import seedUsers from './user.seed.js'
import seedStories from './stories.seed.js'
import seedCategories from './category.seed.js' // Import category seed

dotenv.config()

const mainSeed = async () => {
	try {
		await mongoose.connect(process.env.DEV_MONGO_URI)
		console.log('✅ Terhubung ke MongoDB')

		const users = await seedUsers()
		await seedStories(users)
		await seedCategories()

		console.log('🎉 Semua data berhasil di-seed')
		process.exit()
	} catch (error) {
		console.error('❌ Gagal seeding data:', error)
		process.exit(1)
	}
}

mainSeed()
