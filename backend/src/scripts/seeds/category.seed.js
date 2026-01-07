import Category from '../../models/category.model.js'

const categories = [
	{ name: 'Technology', slug: 'technology' },
	{ name: 'Programming', slug: 'programming' },
	{ name: 'Web Development', slug: 'web-development' },
	{ name: 'UI/UX', slug: 'ui-ux' },
	{ name: 'Startup', slug: 'startup' },
	{ name: 'Business', slug: 'business' },
	{ name: 'Tutorial', slug: 'tutorial' },
	{ name: 'Opinion', slug: 'opinion' },
]

const seedCategories = async () => {
	try {
		await Category.insertMany(categories, { ordered: false })
		console.log('✅ Categories berhasil di-seed')
		return categories
	} catch (error) {
		console.error('❌ Gagal seeding categories:', error)
		throw error
	}
}

export default seedCategories
