import { z } from 'zod'

export const registerSchema = z.object({
	name: z.string().min(3, { message: 'Nama minimal 3 karakter' }),
	username: z.string().min(3, { message: 'Username minimal 3 karakter' }),
	email: z.email({ message: 'Format email tidak valid' }),
	password: z.string().min(6, { message: 'Password minimal 6 karakter' }),
})

export const loginSchema = z.object({
	email: z.email({ message: 'Format email tidak valid' }),
	password: z.string().min(1, { message: 'Password harus diisi' }),
})
