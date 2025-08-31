import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import morgan from 'morgan'
import helmet from 'helmet'
import rateLimit from 'express-rate-limit'

// Routes
import storyRoutes from './routes/story.routes.js'
import authRoutes from './routes/auth.routes.js'
import cookieParser from 'cookie-parser'

// Load environment variables
dotenv.config({ debug: process.env.NODE_ENV == 'development' })

// Validate required environment variables
const requiredEnvVars = ['PROD_MONGO_URI', 'JWT_SECRET', 'FRONTEND_URL']
const missingEnvVars = requiredEnvVars.filter((envVar) => !process.env[envVar])

if (missingEnvVars.length > 0) {
	console.error(
		`❌ Missing required environment variables: ${missingEnvVars.join(', ')}`
	)
	process.exit(1)
}

// App Initialization
const app = express()

// Security Middleware
app.use(helmet())

// Global Rate Limiting
const globalRateLimiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	max: 100, // limit each IP to 100 requests per windowMs
	message: {
		success: false,
		message: 'Too many requests from this IP, please try again later.',
	},
	standardHeaders: true,
	legacyHeaders: false,
})
app.use(globalRateLimiter)

// * CORE MIDDLEWARE

// Cors Configuration
app.use(
	cors({
		origin:
			process.env.FRONTEND_URL?.split(',').map((url) => url.trim()) ||
			'http://localhost:5173',
		credentials: true,
		optionsSuccessStatus: 200,
	})
)

// Body Parsing
app.use(cookieParser())
app.use(express.json({ limit: '10mb' }))
app.use(express.urlencoded({ extended: true, limit: '10mb' }))

// Logging
app.use(morgan('dev'))

// Routes
app.use('/api/stories', storyRoutes)
app.use('/api/auth', authRoutes)

// * ERROR HANDLING
// 404 Handler
app.use((req, res) => {
	res.status(404).json({
		status: 'error',
		message: 'Route not found',
	})
})

// Global Error Handler
app.use((err, req, res, next) => {
	const statusCode = err.statusCode || 500
	const message = err.message || 'Internal Server Error'

	// Log error in development
	if (process.env.NODE_ENV === 'development') {
		console.error(err.stack)
	}

	res.status(statusCode).json({
		status: 'error',
		message,
		...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
	})
})

export default app
