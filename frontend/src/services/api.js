import axios from 'axios'
import { dgerror, dglog } from '../utils/logger'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

const api = axios.create({
	baseURL: API_BASE_URL, // ganti sesuai backend
	withCredentials: true, // kalau pakai cookie
})

api.interceptors.request.use((config) => {
	dglog('📤 Request:', config)
	return config
})

api.interceptors.response.use(
	(response) => {
		dglog('📥 Response:', response)
		return response
	},
	(error) => {
		dgerror('❌ Error Response:', error.response || error.message)
		return Promise.reject(error)
	}
)

export default api
