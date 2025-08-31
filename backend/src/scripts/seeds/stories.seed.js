import dotenv from 'dotenv'
import Story from '../../models/story.model.js'

dotenv.config()

const seedStories = async (users) => {
	const stories = [
		{
			title: 'Petualangan di Hutan Misterius',
			slug: 'petualangan-di-hutan-misterius',
			excerpt:
				'Sebuah petualangan seru di hutan misterius dengan banyak kejutan dan plot twist yang bikin penasaran.',
			author: users[0]._id, // contoh ObjectId user
			coverImage:
				'https://ik.imagekit.io/dimasadiputra/easter-island-1661655_1920.jpg?updatedAt=1754110562285',
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
			excerpt: 'Cara nenek membuat masakan yang bikin hati tenang.',
			author: users[1]._id,
			coverImage:
				'https://ik.imagekit.io/dimasadiputra/italy-2940134_1920.jpg?updatedAt=1754110562173',
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
			excerpt:
				'Penasaran dengan bagaimana cara film indie di tampilkan? Aku jelaskan semuanya',
			author: users[2]._id,
			coverImage:
				'https://ik.imagekit.io/dimasadiputra/norway-7887613_1920.jpg?updatedAt=1754110562009',
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

	await Story.deleteMany()
	await Story.insertMany(stories)
	console.log('✅ Stories berhasil di-seed')
}

export default seedStories
