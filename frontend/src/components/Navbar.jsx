import { NavLink } from 'react-router'

const Navbar = () => {
	return (
		<nav>
			<NavLink to="/">Home</NavLink>
			<NavLink to="/blog">Blog</NavLink>
		</nav>
	)
}

export default Navbar
