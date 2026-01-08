import mongoose from 'mongoose'

const ImageMetaSchema = new mongoose.Schema(
	{
		fileId: { type: String, required: true, unique: true, index: true },
		url: { type: String, required: true },

		status: {
			type: String,
			enum: ['temp', 'used'],
			default: 'temp',
			index: true,
		},

		type: {
			type: String,
			enum: ['cover', 'embed'],
			required: true,
		},

		userId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
			required: true,
		},

		storyId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Story',
			default: null,
		},

		width: Number,
		height: Number,
		size: Number,
		mimeType: String,

		createdAt: { type: Date, default: Date.now, index: true },
		usedAt: Date,
		deletedAt: Date,
	},
	{ versionKey: false }
)

export default mongoose.model('ImageMeta', ImageMetaSchema)
