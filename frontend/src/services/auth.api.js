// src/services/auth.api.js
import axios from 'axios'

const API_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api'

// Registrasi
export async function registerUser(payload) {
	try {
		const res = await axios.post(`${API_URL}/users/register`, payload, {
			withCredentials: true, // biar cookie HttpOnly ke set
		})
		return res.data
	} catch (err) {
		if (err.response) {
			return err.response.data
		}
		throw err
	}
}
