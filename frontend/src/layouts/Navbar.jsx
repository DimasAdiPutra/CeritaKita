import { Link, NavLink, useLocation } from 'react-router'
import { useState, useEffect } from 'react'
import { motion } from 'motion/react'

// Import Components
import Logo from '../components/Logo'
import Input from '../components/Input'
import HamburgerMenu from '../components/HamburgerMenu'
import Button from '../components/Button'

// Import Icons
import { FiSearch } from "react-icons/fi";

const Navbar = () => {
	// nav menu
	const [isOpen, setIsOpen] = useState(false)

	// Set background transparent
	const [isTransparent, setIsTransparent] = useState(true)

	// Ambil lokasi url saat ini
	const location = useLocation()

	// Handle untuk perubahan bg navbar ketika user ada di halaman home dan di hero section
	useEffect(() => {
		const handleScroll = () => {
			const heroSectionHeight = 10
			if (window.scrollY > heroSectionHeight) {
				setIsTransparent(false)
			} else {
				setIsTransparent(true)
			}
		}

		if (location.pathname === '/') {
			window.addEventListener('scroll', handleScroll)
			handleScroll() // Jalankan saat komponen dimount untuk cek posisi awal
		} else {
			setIsTransparent(false)
		}

		return () => {
			window.removeEventListener('scroll', handleScroll)
		}
	}, [location])


	return (
		<nav
			className={`${isTransparent ? 'bg-transparent' : 'bg-clr-container-light shadow'
				} fixed top-0 z-30 w-full h-20 flex items-center transition`}>
			<div className="container">
				<div className="flex h-16 items-center justify-between w-full relative">
					{/* LOGO */}
					<div className="md:flex md:items-center md:gap-12">
						<Link to="/">
							<Logo dark={!isTransparent} />
						</Link>
					</div>
					{/* LOGO */}

					{/* Search */}
					<div className="hidden lg:block">
						<Input
							text="Search"
							id="search"
							label="Search"
							type="text"
							iconRight={
								<FiSearch
									strokeWidth={1.5}
									size={16}
									className={
										isTransparent ? 'text-clr-text-dark' : 'text-clr-text-light'
									}
								/>
							}
							transparent={isTransparent}
						/>
					</div>
					{/* Search */}

					<div className="flex items-center gap-10">
						{/* NAVLINK === DESKTOP */}
						<nav className="hidden lg:flex" aria-label="Global">
							<ul className="relative flex items-center gap-6 text-sm">
								{/* Beranda */}
								<li>
									<NavLink
										to="/"
										className={({ isActive }) =>
											isTransparent
												? `${isActive
													? 'text-clr-text-dark-hover'
													: 'text-clr-text-dark'
												}
											transition hover:text-clr-text-dark-hover`
												: `${isActive
													? 'text-clr-text-light-hover'
													: 'text-clr-text-light'
												}
											transition hover:text-clr-text-light-hover`
										}>
										Beranda
									</NavLink>
								</li>
								{/* Beranda */}

								{/* Blog */}
								<li>
									<NavLink
										to="/blog"
										className={({ isActive }) =>
											isTransparent
												? `${isActive
													? 'text-clr-text-dark-hover'
													: 'text-clr-text-dark'
												}
											transition hover:text-clr-text-dark-hover`
												: `${isActive
													? 'text-clr-text-light-hover'
													: 'text-clr-text-light'
												}
											transition hover:text-clr-text-light-hover`
										}>
										Blog
									</NavLink>
								</li>
								{/* Blog */}

								{/* Tentang Kami */}
								<li>
									<NavLink
										to="/about"
										className={({ isActive }) =>
											isTransparent
												? `${isActive
													? 'text-clr-text-dark-hover'
													: 'text-clr-text-dark'
												}
											transition hover:text-clr-text-dark-hover`
												: `${isActive
													? 'text-clr-text-light-hover'
													: 'text-clr-text-light'
												}
											transition hover:text-clr-text-light-hover`
										}>
										Tentang Kami
									</NavLink>
								</li>
								{/* Tentang Kami */}
							</ul>
						</nav>
						{/* NAVLINK === DESKTOP */}

						{/* Action Button */}
						<div className="hidden lg:flex sm:gap-4">
							<Button to="/login" text="Masuk" />
							<Button to="/register" text="Daftar" style="secondary" />
						</div>
						{/* Action Button */}

						{/* Hamburger Menu */}
						<div className="block lg:hidden relative z-50">
							<HamburgerMenu
								onClick={() => setIsOpen(!isOpen)}
								isOpen={isOpen}
								dark={isOpen || !isTransparent}
								aria-controls="mobile-menu"
							/>
						</div>
						{/* Hamburger Menu */}
					</div>

					{/* NAVMENU === MOBILE */}
					<motion.div
						id='mobile-menu'
						aria-hidden={!isOpen}
						inert={!isOpen ? "" : undefined}   // Non-aktifkan interaksi saat tertutup
						initial={{ x: '100%' }} // Mulai dari luar layar (kanan)
						animate={{ x: isOpen ? '1%' : '100%' }} // Muncul ke kiri saat isOpen = true
						exit={{ x: '100%' }} // Pergi ke kanan saat isOpen = false
						transition={{ type: 'spring', stiffness: 200, damping: 30 }} // Animasi halus
						className={`${isOpen ? 'shadow-xl' : ''
							} flex h-screen flex-col justify-between border-e bg-clr-container-light fixed top-0 right-0 w-max min-w-72 z-40 px-4 pb-10 pt-24`}>
						<div className="w-full">
							{/* Mobile Search */}
							<Input
								text="Search"
								id="mobileSearch"
								label="Search"
								type="text"
								iconRight={
									<FiSearch
										strokeWidth={1.5}
										size={16}
										className="text-clr-text-light"
									/>
								}
							/>
							{/* Mobile Search */}

							{/* NAVLINK === MOBILE */}
							<ul className="mt-6 space-y-1">
								{/* Beranda */}
								<li>
									<NavLink
										to="/"
										className={({ isActive }) =>
											isActive ? 'navlink-active' : 'navlink'
										}>
										Beranda
									</NavLink>
								</li>
								{/* Beranda */}

								{/* Blog */}
								<li>
									<NavLink
										to="/blog"
										className={({ isActive }) =>
											isActive ? 'navlink-active' : 'navlink'
										}>
										Blog
									</NavLink>
								</li>
								{/* Blog */}

								{/* Tentang Kami */}
								<li>
									<NavLink
										to="/about"
										className={({ isActive }) =>
											isActive ? 'navlink-active' : 'navlink'
										}>
										Tentang Kami
									</NavLink>
								</li>
								{/* Tentang Kami */}
							</ul>
							{/* NAVLINK === MOBILE */}
						</div>

						{/* Action Button */}
						<div className="flex flex-col gap-2">
							<Button to="/login" text="Masuk" style="primary-outline" />
							<Button to="/register" text="Daftar" />
						</div>
						{/* Action Button */}
					</motion.div>
					{/* NAVMENU === MOBILE */}
				</div>
			</div>
		</nav>
	)
}

export default Navbar
