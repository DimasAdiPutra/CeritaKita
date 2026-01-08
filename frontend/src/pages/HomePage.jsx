// pages/HomePage.jsx
import { Helmet } from 'react-helmet-async'

// Layouts
import Header from '../layouts/Home/Header'
import Story from '../layouts/Home/Story'

const HomePage = () => {
	return (
		<>
			<Helmet>
				<title>CeritaKita - Berbagi Cerita & Pengalaman</title>
				<meta
					name="description"
					content="Platform untuk berbagi cerita, pengalaman, dan inspirasi. Temukan cerita menarik dan bagikan pengalamanmu di CeritaKita."
				/>
			</Helmet>

			<main>
				<Header />
				<Story />
			</main>
		</>
	)
}

export default HomePage