import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigate } from 'react-router'
import { successToast } from '@/utils/alerts'
import { dgerror, dglog } from '../utils/logger'
import { useAuth } from '@/context/auth/useAuth' // 🔥 custom hook untuk akses AuthContext

/**
 * useAuthForm
 * Custom hook untuk menangani form login/register secara konsisten.
 *
 * @param {ZodSchema} schema - Skema validasi Zod
 * @param {Function} submitHandler - Fungsi API handler (loginUser / registerUser)
 * @returns {Object} handler form, error, loading state, dll
 */
export const useAuthForm = (schema, submitHandler) => {
	const [loading, setLoading] = useState(false)
	const [rootError, setRootError] = useState(null)
	const navigate = useNavigate()

	const { refreshUser } = useAuth() // 🔹 akses fungsi global untuk update user state

	const {
		register,
		handleSubmit,
		setError,
		formState: { errors },
	} = useForm({
		resolver: zodResolver(schema),
		mode: 'onChange',
	})

	/**
	 * Handler utama saat form disubmit
	 * - Jalankan API handler (login/register)
	 * - Tangani validasi & error dari backend
	 * - Update AuthContext dengan refreshUser()
	 */
	const onSubmit = async (data) => {
		setLoading(true)
		setRootError(null)

		try {
			const res = await submitHandler(data)
			dglog('🟢 [AuthForm] API Response:', res)

			// ✅ Jika sukses login/register
			if (res?.success) {
				successToast(res.message || 'Berhasil!')

				// 🔹 Perbarui data user di AuthContext agar navbar langsung berubah
				await refreshUser()

				// 🔹 Redirect ke beranda
				navigate('/')
				return
			}

			// ⚠️ Jika gagal (validasi/server error)
			dglog('🟠 [AuthForm] Gagal login/register:', res)
			if (res?.success === false) {
				const errorPayload = res.errors || res?.data?.errors || {}
				const errorCode = errorPayload.code
				const errorDetails = errorPayload.details || {}
				const message =
					res.message || res?.data?.message || 'Terjadi kesalahan.'

				if (
					errorCode === 'DUPLICATE_ENTRY' &&
					Object.keys(errorDetails).length
				) {
					// Set error field spesifik
					Object.entries(errorDetails).forEach(([field, msg]) => {
						setError(field, { type: 'server', message: msg })
					})
				} else {
					// Error umum
					setRootError(message)
				}
			}
		} catch (err) {
			dgerror('🔴 [AuthForm Error]:', err)
			setRootError('Terjadi kesalahan server.')
		} finally {
			setLoading(false)
		}
	}

	return {
		register,
		handleSubmit: handleSubmit(onSubmit),
		errors,
		loading,
		rootError,
		setError,
	}
}
