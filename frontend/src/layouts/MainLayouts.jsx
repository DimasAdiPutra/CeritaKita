// layouts/MainLayouts.jsx
import { Outlet } from 'react-router' // Tambahkan import
import Navbar from './Navbar'
import Footer from './Footer'

const MainLayouts = () => {
	return (
		<>
			<Navbar />
			<main className="flex-grow flex flex-col">
				<Outlet /> {/* Gunakan Outlet, bukan children */}
			</main>
			<Footer />
		</>
	)
}

export default MainLayouts