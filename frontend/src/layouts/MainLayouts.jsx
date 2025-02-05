import Navbar from './Navbar'

const MainLayouts = ({ children }) => {
	return (
		<>
			<Navbar />
			<div className="p-2">{children}</div>
		</>
	)
}

export default MainLayouts
