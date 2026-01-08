import slugify from 'slugify'

export const generateStorySlug = async (title, StoryModel) => {
	const baseSlug = slugify(title, {
		lower: true,
		strict: true,
		trim: true,
	})

	let slug = baseSlug
	let counter = 1

	while (await StoryModel.exists({ slug })) {
		slug = `${baseSlug}-${counter}`
		counter++
	}

	return slug
}
