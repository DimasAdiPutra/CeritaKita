import mongoose from 'mongoose'

const imageMetaSchema = new mongoose.Schema(
	{
		url: { type: String, required: true },
		fileId: { type: String, required: true },
		width: { type: Number },
		height: { type: Number },
		size: { type: Number },
		mimeType: { type: String },
	},
	{ _id: false } // Jangan bikin _id internal untuk subdoc
)

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
		excerpt: {
			type: String,
			trim: true,
			default: '',
		},
		author: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
			required: true,
		},
		coverImage: {
			type: imageMetaSchema,
			default: null,
		},
		contentHTML: {
			type: String,
			required: true,
		},
		contentJSON: {
			type: Object,
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
