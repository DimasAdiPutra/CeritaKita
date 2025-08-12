import axios from 'axios'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

const api = axios.create({
	baseURL: API_BASE_URL, // ganti sesuai backend
	withCredentials: true, // kalau pakai cookie
})

api.interceptors.request.use((config) => {
	console.log('📤 Request:', config)
	return config
})

api.interceptors.response.use(
	(response) => {
		console.log('📥 Response:', response)
		return response
	},
	(error) => {
		console.error('❌ Error Response:', error.response || error.message)
		return Promise.reject(error)
	}
)

// * GET ALL STORIES
export const getStories = () => api.get('/stories')

export default api
