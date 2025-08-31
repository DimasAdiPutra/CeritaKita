import mongoose from 'mongoose'

const connectDB = async () => {
	const uri =
		process.env.NODE_ENV === 'production'
			? process.env.PROD_MONGO_URI
			: process.env.DEV_MONGO_URI

	try {
		const conn = await mongoose.connect(uri)
		console.log(`✅ MongoDB Connected: ${conn.connection.host}`)
	} catch (error) {
		console.error('❌ MongoDB connection error:', error.message)
		process.exit(1)
	}
}

export default connectDB
