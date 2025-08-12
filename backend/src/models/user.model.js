import mongoose from 'mongoose'

const userSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: [true, 'Nama wajib diisi'],
			trim: true,
		},
		email: {
			type: String,
			required: [true, 'Email wajib diisi'],
			unique: true,
			lowercase: true,
			match: [/\S+@\S+\.\S+/, 'Format email tidak valid'],
		},
		password: {
			type: String,
			required: [true, 'Password wajib diisi'],
			minlength: [6, 'Password minimal 6 karakter'],
		},
		avatar: {
			type: String, // URL dari imagekit.io atau lainnya
			default: 'https://ik.imagekit.io/ceritakita/default-avatar.jpg',
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

const User = mongoose.model('User', userSchema)
export default User
