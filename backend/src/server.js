// Load environment variables
import dotenv from 'dotenv'
dotenv.config({ debug: process.env.NODE_ENV == 'development' })

import app from './app.js'
import connectDB from './config/db.js'

const PORT = process.env.PORT || 5000

// Handle graceful shutdown
process.on('SIGTERM', () => {
	console.log('SIGTERM received, shutting down gracefully')
	process.exit(0)
})

process.on('SIGINT', () => {
	console.log('SIGINT received, shutting down gracefully')
	process.exit(0)
})

// Start server function
const startServer = async () => {
	try {
		// Connect to database
		await connectDB()

		// Start server
		const server = app.listen(PORT, () => {
			console.log(`🚀 Server running on port ${PORT}`)
			console.log(`📡 Environment: ${process.env.NODE_ENV || 'development'}`)
			console.log(`📅 ${new Date().toISOString()}`)
		})

		// Handle server errors
		server.on('error', (error) => {
			console.error('❌ Server error:', error.message)
			process.exit(1)
		})
	} catch (error) {
		console.error('❌ Failed to start server:', error.message)
		process.exit(1)
	}
}

startServer()
