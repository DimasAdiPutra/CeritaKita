/**
 * Generate slug otomatis dari title
 * @param {string} title - Judul story
 * @param {Model} StoryModel - Mongoose Story model untuk pengecekan duplicate
 * @returns {Promise<string>} slug yang unik
 */
export const generateStorySlug = async (title, StoryModel) => {
	// Sanitize title menjadi slug dasar
	const baseSlug = title
		.toLowerCase()
		.trim()
		.replace(/[^\w\s-]/g, '')
		.replace(/[\s_-]+/g, '-')
		.replace(/^-+|-+$/g, '')
		.substring(0, 100)

	// Generate timestamp untuk keunikan
	const timestamp = new Date()
		.toISOString()
		.replace(/[:\-T]/g, '')
		.slice(0, 14)

	// Buat slug dengan timestamp
	let slug = `${baseSlug}-${timestamp}`

	// Cek jika masih conflict, tambah random suffix
	const existing = await StoryModel.findOne({ slug })
	if (existing) {
		const randomSuffix = Math.random().toString(36).substring(2, 6)
		slug = `${baseSlug}-${timestamp}-${randomSuffix}`
	}

	return slug
}

export default { generateStorySlug }
