import { Link, NavLink, useLocation } from 'react-router'
import { useState, useEffect, useRef } from 'react'
import { motion } from 'motion/react'

// Import Components
import Logo from '../components/Logo'
import Input from '../components/Input'
import HamburgerMenu from '../components/HamburgerMenu'
import Button from '../components/Button'

// Import Icons
import { FiSearch } from "react-icons/fi";
import { IoIosArrowDown } from "react-icons/io";

const Navbar = () => {
	// nav menu
	const [isOpen, setIsOpen] = useState(false)

	// Set background transparent
	const [isTransparent, setIsTransparent] = useState(true)

	// Ambil lokasi url saat ini
	const location = useLocation()

	// dropdown
	const [isDropdownOpen, setIsDropdownOpen] = useState(false)
	const dropdownRef = useRef(null)

	// Handle toggle dropdown
	const handleToggleDropdown = () => {
		setIsDropdownOpen((prev) => !prev)
	}

	// Handle ketika klik di luar dropdown
	const handleClickOutside = (e) => {
		if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
			setIsDropdownOpen(false)
		}
	}

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

	// tambahkan event ketika terdeteksi ada klik di luar dropdown
	useEffect(() => {
		if (isDropdownOpen) {
			document.addEventListener('click', handleClickOutside)
		} else {
			document.removeEventListener('click', handleClickOutside)
		}

		return () => {
			document.removeEventListener('click', handleClickOutside)
		}
	}, [isDropdownOpen])

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

								{/* Kategori */}
								<li className="relative">
									<span
										ref={dropdownRef}
										className={`${isTransparent ? "text-clr-text-dark hover:text-clr-text-dark-hover" : "text-clr-text-light hover:text-clr-text-light-hover"} cursor-pointer transition`}
										onClick={handleToggleDropdown}>
										Kategori
									</span>

									{/* Dropdown Menu */}
									<motion.ul
										initial={{ height: 0 }}
										animate={{ height: isDropdownOpen ? 'auto' : 0 }}
										exit={{ height: 0 }}
										transition={{ duration: 0.3, ease: 'easeInOut' }}
										className="absolute right-0 mt-2 w-40 bg-clr-container-light shadow-lg rounded-lg overflow-hidden">
										<li>
											<NavLink
												to="/kategori/destinasi"
												className="block px-4 py-2 text-clr-text-light hover:text-clr-primary">
												Destinasi
											</NavLink>
										</li>
										<li>
											<NavLink
												to="/kategori/kuliner"
												className="block px-4 py-2 text-clr-text-light hover:text-clr-primary">
												Kuliner
											</NavLink>
										</li>
										<li>
											<NavLink
												to="/kategori/lifestyle"
												className="block px-4 py-2 text-clr-text-light hover:text-clr-primary">
												Lifestyle
											</NavLink>
										</li>
										<li>
											<NavLink
												to="/kategori/tipsnhacks"
												className="block px-4 py-2 text-clr-text-light hover:text-clr-primary">
												Tips & Hacks
											</NavLink>
										</li>
									</motion.ul>
									{/* Dropdown Menu */}
								</li>
								{/* Kategori */}
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
							/>
						</div>
						{/* Hamburger Menu */}
					</div>

					{/* NAVMENU === MOBILE */}
					<motion.div
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

								{/* Kategori */}
								<li>
									<details className="group [&_summary::-webkit-details-marker]:hidden">
										<summary className="flex cursor-pointer items-center justify-between rounded-lg px-4 py-2 text-clr-text-light">
											<span className="text-body-small-base font-medium">
												Kategori
											</span>

											<span className="shrink-0 transition duration-300 group-open:-rotate-180">
												<IoIosArrowDown
													strokeWidth={1.5}
													className="text-clr-text-light"
												/>
											</span>
										</summary>

										<ul className="mt-2 space-y-1 px-4">
											<li>
												<NavLink
													to="/kategori/destinasi"
													className={({ isActive }) =>
														isActive ? 'navlink-active' : 'navlink'
													}>
													Destinasi
												</NavLink>
											</li>

											<li>
												<NavLink
													to="/kategori/kuliner"
													className={({ isActive }) =>
														isActive ? 'navlink-active' : 'navlink'
													}>
													Kuliner
												</NavLink>
											</li>

											<li>
												<NavLink
													to="/kategori/lifestyle"
													className={({ isActive }) =>
														isActive ? 'navlink-active' : 'navlink'
													}>
													Lifestyle
												</NavLink>
											</li>

											<li>
												<NavLink
													to="/kategori/tipsnhacks"
													className={({ isActive }) =>
														isActive ? 'navlink-active' : 'navlink'
													}>
													Tips & Hacks
												</NavLink>
											</li>
										</ul>
									</details>
								</li>
								{/* Kategori */}
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
