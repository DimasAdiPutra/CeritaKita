import { BrowserRouter as Router, Route, Routes } from 'react-router'
import { Suspense, lazy } from 'react'

// Import pages
const HomePage = lazy(() => import('../pages/HomePage'))
const BlogPage = lazy(() => import('../pages/BlogPage'))
const NotFoundPage = lazy(() => import('../pages/NotFoundPage'))
const RegisterPage = lazy(() => import('../pages/auth/RegisterPage'))
const LoginPage = lazy(() => import('../pages/auth/LoginPage'))
const LogoutPage = lazy(() => import('../pages/auth/LogoutPage'))

// import components
import Loading from '../components/ui/Loading'

// import layouts
import MainLayouts from '../layouts/MainLayouts'

const AppRoutes = () => {
	return (
		<Router>
			<Suspense fallback={<Loading />}>
				<Routes>
					{/* Main Routes with Layout */}
					<Route element={<MainLayouts />}>
						<Route path="/" element={<HomePage />} />
						<Route path="/blog" element={<BlogPage />} />
						<Route path="*" element={<NotFoundPage />} />
					</Route>

					{/* Auth Routes (tanpa layout utama) */}
					<Route path="/register" element={<RegisterPage />} />
					<Route path="/login" element={<LoginPage />} />
					<Route path="/logout" element={<LogoutPage />} />
				</Routes>
			</Suspense>
		</Router>
	)
}

export default AppRoutes
