import { Link, NavLink, useLocation } from 'react-router'
import { useState, useEffect, useRef } from 'react'
import { motion } from 'motion/react'

import Logo from '../components/Logo'
import Input from '../components/Input'
import HamburgerMenu from '../components/HamburgerMenu'
import Button from '../components/Button'

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
			if (handleScroll) {
				window.removeEventListener('scroll', handleScroll)
			}
		}
	}, [location])

	// tambahkan event ketika terdeteksi ada klik di luar dropdown
	useEffect(() => {
		document.addEventListener('click', handleClickOutside)
		return () => {
			document.removeEventListener('click', handleClickOutside)
		}
	}, [])

	return (
		<nav
			className={`${
				isTransparent ? 'bg-transparent' : ' bg-primary shadow'
			} fixed top-0 z-30 w-full h-20 flex items-center transition`}>
			<div className="container">
				<div className="flex h-16 items-center justify-between w-full relative">
					{/* LOGO */}
					<div className="md:flex md:items-center md:gap-12">
						<Link to="/">
							<Logo />
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
								<svg
									width="16"
									height="16"
									viewBox="0 0 32 32"
									fill="none"
									xmlns="http://www.w3.org/2000/svg">
									<path
										d="M28 28L22.2094 22.2093M22.2094 22.2093C23.1999 21.2188 23.9856 20.0429 24.5217 18.7487C25.0577 17.4546 25.3336 16.0675 25.3336 14.6667C25.3336 13.2659 25.0577 11.8788 24.5217 10.5846C23.9856 9.29043 23.1999 8.11452 22.2094 7.124C21.2188 6.13348 20.0429 5.34776 18.7488 4.8117C17.4546 4.27563 16.0675 3.99973 14.6667 3.99973C13.2659 3.99973 11.8788 4.27563 10.5846 4.8117C9.29046 5.34776 8.11455 6.13348 7.12403 7.124C5.12359 9.12444 3.99976 11.8376 3.99976 14.6667C3.99976 17.4957 5.12359 20.2089 7.12403 22.2093C9.12447 24.2098 11.8376 25.3336 14.6667 25.3336C17.4957 25.3336 20.2089 24.2098 22.2094 22.2093Z"
										stroke={isTransparent ? '#FAFAFA' : '#2E2E2E'}
										strokeWidth="2"
										strokeLinecap="round"
										strokeLinejoin="round"
									/>
								</svg>
							}
							transparent={isTransparent}
						/>
					</div>
					{/* Search */}

					<div className="flex items-center gap-10">
						{/* Navlink Desktop */}
						<nav className="hidden lg:flex" aria-label="Global">
							<ul className="relative flex items-center gap-6 text-sm">
								{/* Beranda */}
								<li>
									<NavLink
										to="/"
										className={({ isActive }) =>
											`${
												isActive
													? 'text-neutral-white/75'
													: 'text-neutral-white'
											}
											transition hover:text-neutral-white/75`
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
											`${
												isActive
													? 'text-neutral-white/75'
													: 'text-neutral-white'
											}
											transition hover:text-neutral-white/75`
										}>
										Blog
									</NavLink>
								</li>
								{/* Blog */}

								{/* Kategori */}
								<li className="relative">
									<span
										ref={dropdownRef}
										className="text-neutral-white cursor-pointer transition hover:text-neutral-white/75"
										onClick={handleToggleDropdown}>
										Kategori
									</span>

									{/* Dropdown Menu */}
									<motion.ul
										initial={{ height: 0 }}
										animate={{ height: isDropdownOpen ? 'auto' : 0 }}
										exit={{ height: 0 }}
										transition={{ duration: 0.3, ease: 'easeInOut' }}
										className="absolute right-0 mt-2 w-40 bg-neutral-white shadow-lg rounded-lg overflow-hidden">
										<li>
											<NavLink
												to="/kategori/destinasi"
												className="block px-4 py-2 text-neutral-darkgray hover:text-primary">
												Destinasi
											</NavLink>
										</li>
										<li>
											<NavLink
												to="/kategori/kuliner"
												className="block px-4 py-2 text-neutral-darkgray hover:text-primary">
												Kuliner
											</NavLink>
										</li>
										<li>
											<NavLink
												to="/kategori/lifestyle"
												className="block px-4 py-2 text-neutral-darkgray hover:text-primary">
												Lifestyle
											</NavLink>
										</li>
										<li>
											<NavLink
												to="/kategori/tipsnhacks"
												className="block px-4 py-2 text-neutral-darkgray hover:text-primary">
												Tips & Hacks
											</NavLink>
										</li>
									</motion.ul>
									{/* Dropdown Menu */}
								</li>
								{/* Kategori */}
							</ul>
						</nav>
						{/* Navlink Desktop */}

						{/* Action Button */}
						<div className="hidden lg:flex sm:gap-4">
							<Button to="/login" text="Masuk" style="neutral-outline" />
							<Button to="/register" text="Daftar" style="neutral" />
						</div>
						{/* Action Button */}

						{/* Hamburger Menu */}
						<div className="block lg:hidden relative z-50">
							<HamburgerMenu
								onClick={() => setIsOpen(!isOpen)}
								isOpen={isOpen}
								dark={isOpen}
							/>
						</div>
						{/* Hamburger Menu */}
					</div>

					{/* Navmenu Mobile */}
					<motion.div
						initial={{ x: '100%' }} // Mulai dari luar layar (kanan)
						animate={{ x: isOpen ? '1%' : '100%' }} // Muncul ke kiri saat isOpen = true
						exit={{ x: '100%' }} // Pergi ke kanan saat isOpen = false
						transition={{ type: 'spring', stiffness: 200, damping: 30 }} // Animasi halus
						className={`${
							isOpen ? 'shadow-xl' : ''
						} flex h-screen flex-col justify-between border-e bg-neutral-white fixed top-0 right-0 w-max min-w-72 z-40 px-4 pb-10 pt-24`}>
						<div className="w-full">
							{/* Mobile Search */}
							<Input
								text="Search"
								id="mobileSearch"
								label="Search"
								type="text"
								iconRight={
									<svg
										width="16"
										height="16"
										viewBox="0 0 32 32"
										fill="none"
										xmlns="http://www.w3.org/2000/svg">
										<path
											d="M28 28L22.2094 22.2093M22.2094 22.2093C23.1999 21.2188 23.9856 20.0429 24.5217 18.7487C25.0577 17.4546 25.3336 16.0675 25.3336 14.6667C25.3336 13.2659 25.0577 11.8788 24.5217 10.5846C23.9856 9.29043 23.1999 8.11452 22.2094 7.124C21.2188 6.13348 20.0429 5.34776 18.7488 4.8117C17.4546 4.27563 16.0675 3.99973 14.6667 3.99973C13.2659 3.99973 11.8788 4.27563 10.5846 4.8117C9.29046 5.34776 8.11455 6.13348 7.12403 7.124C5.12359 9.12444 3.99976 11.8376 3.99976 14.6667C3.99976 17.4957 5.12359 20.2089 7.12403 22.2093C9.12447 24.2098 11.8376 25.3336 14.6667 25.3336C17.4957 25.3336 20.2089 24.2098 22.2094 22.2093Z"
											stroke="#2E2E2E"
											strokeWidth="2"
											strokeLinecap="round"
											strokeLinejoin="round"
										/>
									</svg>
								}
							/>
							{/* Mobile Search */}

							{/* Navlink mobile */}
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
										<summary className="flex cursor-pointer items-center justify-between rounded-lg px-4 py-2 text-black">
											<span className="text-body-small-base font-medium">
												Kategori
											</span>

											<span className="shrink-0 transition duration-300 group-open:-rotate-180">
												<svg
													xmlns="http://www.w3.org/2000/svg"
													className="size-5"
													viewBox="0 0 20 20"
													fill="currentColor">
													<path
														fillRule="evenodd"
														d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
														clipRule="evenodd"
													/>
												</svg>
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
							{/* Navlink mobile */}
						</div>

						{/* Action Button */}
						<div className="flex flex-col gap-2">
							<Button to="/login" text="Masuk" style="primary-outline" />
							<Button to="/register" text="Daftar" />
						</div>
						{/* Action Button */}
					</motion.div>
					{/* Navlink Mobile */}
				</div>
			</div>
		</nav>
	)
}

export default Navbar
