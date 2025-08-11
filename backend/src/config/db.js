import mongoose from 'mongoose'

const connectDB = async () => {
	try {
		const uri =
			process.env.NODE_ENV === 'production'
				? process.env.PROD_MONGO_URI
				: process.env.DEV_MONGO_URI

		await mongoose.connect(uri)
		console.log(`✅ MongoDB Connected (${process.env.NODE_ENV})`)
	} catch (error) {
		console.error('❌ MongoDB Connection Error:', error.message)
		process.exit(1)
	}
}

export default connectDB
