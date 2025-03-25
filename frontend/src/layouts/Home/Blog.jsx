import { useState } from 'react'
import { Link } from 'react-router'
import { motion } from 'motion/react'

import Input from '../../components/Input'

import { Search, ChevronDown } from 'lucide-react'

const Blog = () => {
	const [isDropdownOpen, setIsDropdownOpen] = useState(false)

	// Handle toggle dropdown
	const handleToggleDropdown = () => {
		setIsDropdownOpen((prev) => !prev)
	}

	return (
		<section className="pt-16">
			<div className="container">
				{/* Judul */}
				<h1 className="text-subtitle mb-4">
					Bacalah, Nikmati, dan Bagikan Ceritamu
				</h1>
				{/* Judul */}

				{/* Paragraf */}
				<p className="text-body-base mb-7">
					Cerita yang kamu cari ada di sini. Biarkan pengalaman dari CeritaKita
					menghibur, menginspirasi, dan memotivasi.
				</p>
				{/* Paragraf */}

				<div className="md:flex md:items-center md:justify-between">
					{/* Input Search */}
					<Input
						iconLeft={
							<Search size={16} strokeWidth={1.6} className="text-black" />
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
							<p className="px-4 py-2 text-body-base/none text-neutral-darkgray">
								Kategori :
							</p>

							<button
								onClick={handleToggleDropdown}
								className="flex items-center gap-1 h-full p-2 cursor-pointer border border-neutral-darkgray rounded text-neutral-darkgray hover:bg-gray-50">
								<span className="">Semua</span>
								<ChevronDown
									size={18}
									strokeWidth={1.5}
									className="text-black"
								/>
							</button>
						</div>

						<motion.div
							initial={{ height: 0 }}
							animate={{ height: isDropdownOpen ? 'auto' : 0 }}
							exit={{ height: 0 }}
							transition={{ duration: 0.3, ease: 'easeInOut' }}
							className="absolute start-[50%] md:start-auto md:end-0 top-full h-full z-10 w-max rounded-md bg-neutral-white shadow-2xl overflow-hidden"
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
	)
}

export default Blog
