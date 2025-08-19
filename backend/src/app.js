import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import morgan from 'morgan'
import storyRoutes from './routes/story.routes.js'
import userRoutes from './routes/user.routes.js'
import cookieParser from 'cookie-parser'

dotenv.config({ debug: true })

const app = express()

// Middleware
app.use(cors({ origin: process.env.FRONTEND_URL, credentials: true }))
app.use(cookieParser())
app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Routes
app.use('/api/stories', storyRoutes)
app.use('/api/users', userRoutes)

export default app
