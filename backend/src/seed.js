import dotenv from 'dotenv'
import Story from './models/story.model.js'
import connectDB from './config/db.js'

dotenv.config()

const seedStories = [
	{
		title: 'Petualangan di Hutan Misterius',
		slug: 'petualangan-di-hutan-misterius',
		author: '64d28b9e6f2e3b1a88f9c001', // contoh ObjectId user
		coverImage: 'https://ik.imagekit.io/ceritakita/cover/forest.jpg',
		contentHTML: `
      <h1>Bab 1: Awal Perjalanan</h1>
      <p>Pagi itu cerah, burung-burung berkicau riang.</p>
      <img src="https://ik.imagekit.io/ceritakita/images/forest-path.jpg" alt="Jalan setapak di hutan"/>
      <p>Kami melangkah masuk ke dalam hutan yang penuh misteri...</p>
    `,
		contentJSON: {
			type: 'doc',
			content: [
				{
					type: 'heading',
					attrs: { level: 1 },
					content: [{ type: 'text', text: 'Bab 1: Awal Perjalanan' }],
				},
				{
					type: 'paragraph',
					content: [
						{
							type: 'text',
							text: 'Pagi itu cerah, burung-burung berkicau riang.',
						},
					],
				},
				{
					type: 'image',
					attrs: {
						src: 'https://ik.imagekit.io/ceritakita/images/forest-path.jpg',
						alt: 'Jalan setapak di hutan',
					},
				},
				{
					type: 'paragraph',
					content: [
						{
							type: 'text',
							text: 'Kami melangkah masuk ke dalam hutan yang penuh misteri...',
						},
					],
				},
			],
		},
		tags: ['petualangan', 'hutan'],
		status: 'published',
		views: 120,
		likes: 45,
		publishedAt: new Date('2025-08-01T10:00:00Z'),
	},
	{
		title: 'Resep Rahasia Nenek',
		slug: 'resep-rahasia-nenek',
		author: '64d28b9e6f2e3b1a88f9c002',
		coverImage: 'https://ik.imagekit.io/ceritakita/cover/kitchen.jpg',
		contentHTML: `
      <h2>Rahasia Rasa Otentik</h2>
      <p>Nenek selalu bilang, kunci rasa ada pada rempah-rempah.</p>
      <img src="https://ik.imagekit.io/ceritakita/images/spices.jpg" alt="Rempah-rempah dapur"/>
      <ul>
        <li>Jahe</li>
        <li>Kunyit</li>
        <li>Kayu manis</li>
      </ul>
    `,
		contentJSON: {
			type: 'doc',
			content: [
				{
					type: 'heading',
					attrs: { level: 2 },
					content: [{ type: 'text', text: 'Rahasia Rasa Otentik' }],
				},
				{
					type: 'paragraph',
					content: [
						{
							type: 'text',
							text: 'Nenek selalu bilang, kunci rasa ada pada rempah-rempah.',
						},
					],
				},
				{
					type: 'image',
					attrs: {
						src: 'https://ik.imagekit.io/ceritakita/images/spices.jpg',
						alt: 'Rempah-rempah dapur',
					},
				},
				{
					type: 'bulletList',
					content: [
						{
							type: 'listItem',
							content: [
								{
									type: 'paragraph',
									content: [{ type: 'text', text: 'Jahe' }],
								},
							],
						},
						{
							type: 'listItem',
							content: [
								{
									type: 'paragraph',
									content: [{ type: 'text', text: 'Kunyit' }],
								},
							],
						},
						{
							type: 'listItem',
							content: [
								{
									type: 'paragraph',
									content: [{ type: 'text', text: 'Kayu manis' }],
								},
							],
						},
					],
				},
			],
		},
		tags: ['resep', 'masakan', 'keluarga'],
		status: 'published',
		views: 87,
		likes: 30,
		publishedAt: new Date('2025-08-05T14:30:00Z'),
	},
	{
		title: 'Kisah di Balik Layar Film Indie',
		slug: 'kisah-di-balik-layar-film-indie',
		author: '64d28b9e6f2e3b1a88f9c003',
		coverImage: 'https://ik.imagekit.io/ceritakita/cover/film.jpg',
		contentHTML: `
      <h3>Persiapan yang Melelahkan</h3>
      <p>Pembuatan film indie penuh tantangan dan kreativitas.</p>
      <img src="https://ik.imagekit.io/ceritakita/images/film-set.jpg" alt="Set film indie"/>
      <p>Namun semua terbayar saat layar menayangkan hasilnya.</p>
    `,
		contentJSON: {
			type: 'doc',
			content: [
				{
					type: 'heading',
					attrs: { level: 3 },
					content: [{ type: 'text', text: 'Persiapan yang Melelahkan' }],
				},
				{
					type: 'paragraph',
					content: [
						{
							type: 'text',
							text: 'Pembuatan film indie penuh tantangan dan kreativitas.',
						},
					],
				},
				{
					type: 'image',
					attrs: {
						src: 'https://ik.imagekit.io/ceritakita/images/film-set.jpg',
						alt: 'Set film indie',
					},
				},
				{
					type: 'paragraph',
					content: [
						{
							type: 'text',
							text: 'Namun semua terbayar saat layar menayangkan hasilnya.',
						},
					],
				},
			],
		},
		tags: ['film', 'indie', 'behind the scenes'],
		status: 'published',
		views: 54,
		likes: 12,
		publishedAt: new Date('2025-08-08T09:15:00Z'),
	},
]

const importData = async () => {
	try {
		await connectDB()
		await Story.deleteMany()
		await Story.insertMany(seedStories)
		console.log('✅ Data dummy berhasil dimasukkan!')
		process.exit()
	} catch (error) {
		console.error('❌ Gagal memasukkan data dummy:', error)
		process.exit(1)
	}
}

importData()
