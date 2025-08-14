import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import morgan from 'morgan'
import storyRoutes from './routes/story.routes.js'
import userRoutes from './routes/user.routes.js'

dotenv.config({ debug: true })

const app = express()

// Middleware
app.use(cors({ origin: process.env.FRONTEND_URL, credentials: true }))
app.use(morgan('dev'))
app.use(express.json())

// Routes
app.use('/api/stories', storyRoutes)
app.use('/api/user', userRoutes)

export default app
