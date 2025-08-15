import mongoose from 'mongoose'

const userSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: [true, 'Nama wajib diisi'],
			trim: true,
		},
		username: {
			type: String,
			required: [true, 'UserName wajib diisi'],
			unique: true,
			trim: true,
			index: true,
			match: [
				/^[a-zA-Z0-9_]+$/,
				'Username hanya boleh huruf, angka, dan underscore',
			],
		},
		email: {
			type: String,
			required: [true, 'Email wajib diisi'],
			unique: true,
			lowercase: true,
			index: true,
			match: [/\S+@\S+\.\S+/, 'Format email tidak valid'],
		},
		password: {
			type: String,
			required: [true, 'Password wajib diisi'],
			minlength: [6, 'Password minimal 6 karakter'],
			select: false, // keamanan: tidak dikirim secara default
		},
		avatar: {
			type: String, // URL dari imagekit.io atau lainnya
			default:
				process.env.DEFAULT_AVATAR_URL ||
				'https://ik.imagekit.io/dimasadiputra/default-profile.png?updatedAt=1755230366100',
		},
		bio: {
			type: String,
			default: '',
		},
		job: {
			type: String,
			default: '',
		},
	},
	{ timestamps: true }
)

// Hilangkan password saat convert ke JSON/objek
userSchema.set('toJSON', {
	transform: (doc, ret) => {
		delete ret.password
		return ret
	},
})

const User = mongoose.model('User', userSchema)
export default User
