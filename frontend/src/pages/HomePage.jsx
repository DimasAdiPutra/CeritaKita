import { Helmet } from 'react-helmet-async'

// Import layouts
import Header from '../layouts/Home/Header'
import Blog from '../layouts/Home/Blog'

const HomePage = () => {
	return (
		<>
			<Helmet>
				<title>CeritaKita - Berbagi Cerita & Pengalaman</title>
			</Helmet>

			{/* HEADER */}
			<Header />
			{/* HEADER */}

			{/* BLOG SECTION */}
			<Blog />
			{/* BLOG SECTION */}
		</>
	)
}

export default HomePage
