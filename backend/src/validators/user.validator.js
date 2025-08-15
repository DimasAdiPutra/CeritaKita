import Joi from 'joi'

// Aturan umum
const name = Joi.string().trim().required().messages({
	'string.empty': 'Nama wajib diisi',
	'any.required': 'Nama wajib diisi',
})

const username = Joi.string()
	.trim()
	.pattern(/^[a-zA-Z0-9_]+$/)
	.required()
	.messages({
		'string.empty': 'Username wajib diisi',
		'any.required': 'Username wajib diisi',
		'string.pattern.base': 'Username hanya boleh huruf, angka, dan underscore',
	})

const email = Joi.string()
	.trim()
	.lowercase()
	.email({ tlds: { allow: false } })
	.required()
	.messages({
		'string.empty': 'Email wajib diisi',
		'any.required': 'Email wajib diisi',
		'string.email': 'Format email tidak valid',
	})

const password = Joi.string().min(6).required().messages({
	'string.empty': 'Password wajib diisi',
	'any.required': 'Password wajib diisi',
	'string.min': 'Password minimal 6 karakter',
})

// Schema untuk register
export const registerSchema = Joi.object({
	name,
	username,
	email,
	password,
})

// Schema untuk login
export const loginSchema = Joi.object({
	email,
	password,
})
