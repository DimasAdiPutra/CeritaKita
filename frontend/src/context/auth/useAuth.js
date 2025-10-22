import { useContext } from 'react'
import { AuthContext } from './AuthContext'

/**
 * Custom hook untuk mengakses context Auth dengan mudah
 * Contoh: const { user, setUser, isAuthenticated } = useAuth()
 */
export const useAuth = () => {
	const context = useContext(AuthContext)
	if (!context) {
		throw new Error('useAuth harus digunakan di dalam <AuthProvider>')
	}
	return context
}
