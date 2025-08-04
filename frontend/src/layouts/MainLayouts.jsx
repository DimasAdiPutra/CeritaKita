import Navbar from './Navbar'
import Footer from './Footer'

const MainLayouts = ({ children }) => {
	return (
		<>
			<Navbar />
			<div className="flex-grow flex flex-col">{children}</div>
			<Footer />
		</>
	)
}

export default MainLayouts
