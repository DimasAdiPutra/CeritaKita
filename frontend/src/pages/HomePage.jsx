import { Helmet } from 'react-helmet-async'
import Button from '../components/Button'
import Input from '../components/Input'
import { Link } from 'react-router'
import { motion } from 'motion/react'
import { useState } from 'react'

const HomePage = () => {
	const [isDropdownOpen, setIsDropdownOpen] = useState(false)

	// Handle toggle dropdown
	const handleToggleDropdown = () => {
		setIsDropdownOpen((prev) => !prev)
	}

	return (
		<>
			<Helmet>
				<title>CeritaKita - Berbagi Cerita & Pengalaman</title>
			</Helmet>

			{/* HEADER */}
			<header className="hero relative h-[calc(100vh-16px)] rounded overflow-hidden">
				<video
					autoPlay
					muted
					loop
					className="absolute top-0 left-0 w-full h-full object-cover overflow-hidden">
					<source src="/videos/hero.mp4" type="video/mp4" />
					<source src="/videos/hero.webm" type="video/webm" />
					<p>Browser Anda tidak mendukung tag video.</p>
				</video>
				<div className="container h-full">
					<div className="relative z-20 h-full max-w-xl lg:max-w-7xl sm:px-6 lg:h-screen">
						<div className="flex flex-col justify-center h-full max-w-xl lg:max-w-7xl">
							<h1 className="text-titlepage font-extrabold w-full max-w-48 md:max-w-lg lg:text-9xl lg:max-w-xl xl:text-titlehero xl:max-w-xl text-neutral-white">
								Setiap Cerita Adalah Inspirasi
							</h1>

							<p className="mt-4 text-body-base max-w-lg text-neutral-white">
								Bagikan pengalamanmu, temukan inspirasi dari orang lain, dan
								jadilah bagian dari <strong>CeritaKita</strong> yang saling
								mendukung.
							</p>

							<div className="mt-8 w-max flex text-center gap-2">
								<Button to="/post" text="Bagikan Cerita" style="primary" />
								<Button
									to="/search"
									text="Mulai Menjelajah"
									style="secondary"
								/>
							</div>
						</div>
					</div>
				</div>
			</header>
			{/* HEADER */}

			{/* BLOG SECTION */}
			<section className="pt-16">
				<div className="container">
					{/* Judul */}
					<h1 className="text-subtitle mb-4">
						Bacalah, Nikmati, dan Bagikan Ceritamu
					</h1>
					{/* Judul */}

					{/* Paragraf */}
					<p className="text-body-base mb-7">
						Cerita yang kamu cari ada di sini. Biarkan pengalaman dari
						CeritaKita menghibur, menginspirasi, dan memotivasi.
					</p>
					{/* Paragraf */}

					<div className="md:flex md:items-center md:justify-between">
						{/* Input Search */}
						<Input
							iconLeft={
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
							id="cardSearch"
							label="Search"
							type="text"
							text="Cari Cerita"
						/>
						{/* Input Search */}

						{/* Filter */}
						<div className="relative mt-8 md:mt-0 w-max flex items-center">
							<div className="flex items-center overflow-hidden">
								<p className="px-4 py-2 text-body-base/none text-neutral-darkgray hover:bg-neutral-gray hover:text-neutral-darkgray">
									Kategori :
								</p>

								<button
									onClick={handleToggleDropdown}
									className="flex items-center gap-1 h-full p-2 cursor-pointer border border-neutral-darkgray rounded text-neutral-darkgray hover:bg-gray-50">
									<span className="">Semua</span>
									<svg
										width="16"
										height="16"
										viewBox="0 0 32 32"
										fill="none"
										xmlns="http://www.w3.org/2000/svg">
										<path
											d="M3.27197 10.586C3.64703 10.2111 4.15565 10.0004 4.68597 10.0004C5.2163 10.0004 5.72492 10.2111 6.09997 10.586L16 20.486L25.9 10.586C26.2772 10.2217 26.7824 10.0201 27.3068 10.0247C27.8312 10.0292 28.3328 10.2395 28.7036 10.6104C29.0744 10.9812 29.2848 11.4828 29.2893 12.0072C29.2939 12.5316 29.0923 13.0368 28.728 13.414L17.414 24.728C17.0389 25.1029 16.5303 25.3136 16 25.3136C15.4696 25.3136 14.961 25.1029 14.586 24.728L3.27197 13.414C2.89703 13.0389 2.6864 12.5303 2.6864 12C2.6864 11.4697 2.89703 10.9611 3.27197 10.586Z"
											fill="#2E2E2E"
										/>
									</svg>
								</button>
							</div>

							<motion.div
								initial={{ height: 0 }}
								animate={{ height: isDropdownOpen ? 'auto' : 0 }}
								exit={{ height: 0 }}
								transition={{ duration: 0.3, ease: 'easeInOut' }}
								className="absolute start-[50%] md:start-auto md:end-0 top-full h-full z-10 w-max rounded-md bg-neutral-gray shadow-2xl overflow-hidden"
								role="menu">
								<div className="p-2">
									<Link
										to=""
										onClick={handleToggleDropdown}
										className="block rounded-lg px-4 py-2 text-sm text-neutral-darkgray hover:bg-neutral-gray hover:text-black"
										role="menuitem">
										Semua
									</Link>
									<Link
										to=""
										onClick={handleToggleDropdown}
										className="block rounded-lg px-4 py-2 text-sm text-neutral-darkgray hover:bg-neutral-gray hover:text-black"
										role="menuitem">
										Destinasi
									</Link>

									<Link
										to=""
										onClick={handleToggleDropdown}
										className="block rounded-lg px-4 py-2 text-sm text-neutral-darkgray hover:bg-neutral-gray hover:text-black"
										role="menuitem">
										Kuliner
									</Link>

									<Link
										to=""
										onClick={handleToggleDropdown}
										className="block rounded-lg px-4 py-2 text-sm text-neutral-darkgray hover:bg-neutral-gray hover:text-black"
										role="menuitem">
										Lifestyle
									</Link>

									<Link
										to=""
										onClick={handleToggleDropdown}
										className="block rounded-lg px-4 py-2 text-sm text-neutral-darkgray hover:bg-neutral-gray hover:text-black"
										role="menuitem">
										Tips & Hacks
									</Link>
								</div>
							</motion.div>
						</div>
						{/* Filter */}
					</div>
				</div>
			</section>
			{/* BLOG SECTION */}
		</>
	)
}

export default HomePage
