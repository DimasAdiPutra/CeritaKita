import { BrowserRouter as Router, Route, Routes } from 'react-router'
import { Suspense, lazy } from 'react'

// Import pages
const HomePage = lazy(() => import('../pages/HomePage'))
const BlogPage = lazy(() => import('../pages/BlogPage'))
const NotFoundPage = lazy(() => import('../pages/NotFoundPage'))
const RegisterPage = lazy(() => import('../pages/auth/RegisterPage'))

// import components
import Loading from '../components/Loading'

// import layouts
import MainLayouts from '../layouts/MainLayouts'

const AppRoutes = () => {
	return (
		<Router>
			<Suspense fallback={<Loading />}>
				<MainLayouts>
					<Routes>
						<Route path="/" element={<HomePage />} />
						<Route path="/blog" element={<BlogPage />} />

						{/* Auth */}
						<Route path="/register" element={<RegisterPage />} />

						{/* Halaman 404 Not Found */}
						<Route path='*' element={<NotFoundPage />} />
					</Routes>
				</MainLayouts>
			</Suspense>
		</Router>
	)
}

export default AppRoutes
