import app from './app.js'
import connectDB from './config/db.js'

const PORT = process.env.PORT || 5000

// logging method, dan url yang di request
app.use((req, res, next) => {
	console.log(
		`[${new Date().toISOString()}] ${req.method} ${req.url}`,
		req.body
	)
	next()
})

// logging jika terjadi error
app.use((err, req, res, next) => {
	console.error('🔥 Server Error:', err.stack)
	res.status(500).json({ message: 'Internal Server Error', error: err.message })
})

// Konek Database dan jalankan server
connectDB().then(() => {
	app.listen(PORT, () => {
		console.log(`🚀 Server running on port ${PORT}`)
	})
})
