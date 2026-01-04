// src/services/api.js
import axios from 'axios'
import { dgerror, dglog } from '../utils/logger'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

const api = axios.create({
	baseURL: API_BASE_URL,
	withCredentials: true,
})

api.interceptors.request.use((config) => {
	dglog('📤 Request:', config.method?.toUpperCase(), config.url)
	return config
})

api.interceptors.response.use(
	(response) => {
		dglog('📥 Response:', response.data)
		return response
	},
	(error) => {
		const apiError = error.response?.data

		dgerror('❌ API Error:', apiError || error.message)

		// lempar error versi backend biar UI enak handle
		return Promise.reject(apiError || error)
	}
)

export default api
