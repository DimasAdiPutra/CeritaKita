import mongoose from 'mongoose'

const storySchema = new mongoose.Schema(
	{
		title: {
			type: String,
			required: true,
			trim: true,
		},
		slug: {
			type: String,
			required: true,
			unique: true,
			lowercase: true,
		},
		author: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
			required: true,
		},
		coverImage: {
			type: String, // URL dari ImageKit
			default: null,
		},
		contentHTML: {
			type: String, // hasil editor rich text (untuk render cepat)
			required: true,
		},
		contentJSON: {
			type: Object, // hasil editor JSON (untuk edit ulang)
			required: true,
		},
		tags: [
			{
				type: String,
				lowercase: true,
				trim: true,
			},
		],
		status: {
			type: String,
			enum: ['draft', 'published'],
			default: 'draft',
		},
		views: {
			type: Number,
			default: 0,
		},
		likes: {
			type: Number,
			default: 0,
		},
		publishedAt: {
			type: Date,
			default: null,
		},
	},
	{ timestamps: true }
)

export default mongoose.model('Story', storySchema)
