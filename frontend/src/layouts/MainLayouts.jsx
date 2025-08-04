import Navbar from './Navbar'
import Footer from './Footer'

const MainLayouts = ({ children }) => {
	return (
		<>
			<Navbar />
			<div className="p-2">{children}</div>
			<Footer />
		</>
	)
}

export default MainLayouts
