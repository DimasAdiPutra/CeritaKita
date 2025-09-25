// src/hooks/useAuthForm.js
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigate } from 'react-router'
import { successToast } from '../utils/alerts'

export const useAuthForm = (schema, submitHandler) => {
	const [loading, setLoading] = useState(false)
	const [rootError, setRootError] = useState(null)
	const navigate = useNavigate()

	const {
		register,
		handleSubmit,
		setError,
		formState: { errors },
	} = useForm({
		resolver: zodResolver(schema),
		mode: 'onChange',
	})

	const onSubmit = async (data) => {
		setLoading(true)
		setRootError(null)

		try {
			const res = await submitHandler(data)
			console.log('API Response:', res)

			// Response sukses
			if (res?.success) {
				console.log('success')
				successToast(res.data.message || 'Berhasil')
				navigate('/')
				return
			}

			console.log('lewati success')

			// Response gagal (validasi / server error)
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
			console.error(err)
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
