import { BrowserRouter as Router, Route, Routes } from 'react-router'
import Home from '../pages/Home'
import Blog from '../pages/Blog'
import MainLayouts from '../layouts/MainLayouts'

const AppRoutes = () => {
	return (
		<Router>
			<MainLayouts>
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/blog" element={<Blog />} />
				</Routes>
			</MainLayouts>
		</Router>
	)
}

export default AppRoutes
