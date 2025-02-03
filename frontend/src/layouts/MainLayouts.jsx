import Navbar from './Navbar'

const MainLayouts = ({ children }) => {
	return (
		<>
			<Navbar />
			<div className="">{children}</div>
		</>
	)
}

export default MainLayouts
