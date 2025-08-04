import { useState } from 'react'
import { Link } from 'react-router'
import { motion } from 'motion/react'

import Input from '../../components/Input'

import BlogCard from '../../components/BlogCard'
import Button from '../../components/Button'

// Import Icons
import { FiSearch } from "react-icons/fi";
import { IoIosArrowDown } from "react-icons/io";
import { LuListFilter } from "react-icons/lu";

const Blog = () => {
	const [isFilterDropdownOpen, setIsFilterDropdownOpen] = useState(false)
	const [isSortDropdownOpen, setIsSortDropdownOpen] = useState(false)

	// Handle filter dropdown
	const handleFilterDropdown = () => {
		setIsFilterDropdownOpen((prev) => !prev)
	}

	// Handle sort dropdown
	const handleSortDropdown = () => {
		setIsSortDropdownOpen((prev) => !prev)
	}

	return (
		<section className="pt-16">
			<div className="container">
				{/* Judul */}
				<h2 className="text-subtitle mb-4">
					Bacalah, Nikmati, dan Bagikan Ceritamu
				</h2>
				{/* Judul */}

				{/* Paragraf */}
				<p className="text-body-base mb-7">
					Cerita yang kamu cari ada di sini. Biarkan pengalaman dari CeritaKita
					menghibur, menginspirasi, dan memotivasi.
				</p>
				{/* Paragraf */}

				{/* Filter, Sort and Search */}
				<div className="md:flex md:items-center md:justify-between md:gap-3 mb-10">
					{/* Input Search */}
					<Input
						iconLeft={
							<FiSearch
								size={16}
								strokeWidth={1.6}
								className="text-clr-text-light"
							/>
						}
						id="cardSearch"
						label="Search"
						type="text"
						text="Cari Cerita"
					/>
					{/* Input Search */}

					{/* Filter and Sort */}
					<div className="flex w-full justify-between mt-8 md:mt-0">
						{/* Filter */}
						<div className="relative w-max flex items-center">
							<div className="flex items-center overflow-hidden">
								<p className="pr-4 py-2 text-body-base/none text-clr-text-light">
									Kategori :
								</p>

								<button
									onClick={handleFilterDropdown}
									className="flex items-center gap-1 h-full p-2 cursor-pointer border border-clr-container-dark rounded text-clr-text-light hover:bg-gray-50" aria-label='kategori'>
									<span className="">Semua</span>
									<IoIosArrowDown
										size={18}
										strokeWidth={1.5}
										className="text-black"
									/>
								</button>
							</div>

							<motion.div
								initial={{ height: 0 }}
								animate={{ height: isFilterDropdownOpen ? 'auto' : 0 }}
								exit={{ height: 0 }}
								transition={{ duration: 0.3, ease: 'easeInOut' }}
								className="absolute start-[50%] md:start-auto md:end-0 top-full h-full z-50 w-max rounded-md bg-clr-container-light shadow-2xl overflow-hidden"
								role="menu">
								<div className="p-2">
									<Link
										to=""
										onClick={handleFilterDropdown}
										className="block rounded-lg px-4 py-2 text-sm text-clr-text-light hover:bg-clr-container-dark hover:text-clr-text-light"
										role="menuitem">
										Semua
									</Link>
									<Link
										to=""
										onClick={handleFilterDropdown}
										className="block rounded-lg px-4 py-2 text-sm text-clr-text-light hover:bg-clr-container-dark hover:text-clr-text-light"
										role="menuitem">
										Destinasi
									</Link>

									<Link
										to=""
										onClick={handleFilterDropdown}
										className="block rounded-lg px-4 py-2 text-sm text-clr-text-light hover:bg-clr-container-dark hover:text-clr-text-light"
										role="menuitem">
										Kuliner
									</Link>

									<Link
										to=""
										onClick={handleFilterDropdown}
										className="block rounded-lg px-4 py-2 text-sm text-clr-text-light hover:bg-clr-container-dark hover:text-clr-text-light"
										role="menuitem">
										Lifestyle
									</Link>

									<Link
										to=""
										onClick={handleFilterDropdown}
										className="block rounded-lg px-4 py-2 text-sm text-clr-text-light hover:bg-clr-container-dark hover:text-clr-text-light"
										role="menuitem">
										Tips & Hacks
									</Link>
								</div>
							</motion.div>
						</div>
						{/* Filter */}

						{/* Sort */}
						<div className="relative">
							<button onClick={handleSortDropdown} aria-label='filter'>
								<LuListFilter
									size={32}
									strokeWidth={2}
									className="text-clr-text-light cursor-pointer"
								/>
							</button>

							<motion.div
								initial={{ height: 0 }}
								animate={{ height: isSortDropdownOpen ? 'auto' : 0 }}
								exit={{ height: 0 }}
								transition={{ duration: 0.3, ease: 'easeInOut' }}
								className="absolute end-0 md:start-auto md:end-0 top-full h-full z-50 w-max rounded-md bg-clr-container-light shadow-2xl overflow-hidden"
								role="menu">
								<div className="p-2">
									<Link
										to=""
										onClick={handleSortDropdown}
										className="block rounded-lg px-4 py-2 text-sm text-clr-text-light hover:bg-clr-container-dark hover:text-clr-text-light"
										role="menuitem">
										Terbaru
									</Link>

									<Link
										to=""
										onClick={handleSortDropdown}
										className="block rounded-lg px-4 py-2 text-sm text-clr-text-light hover:bg-clr-container-dark hover:text-clr-text-light"
										role="menuitem">
										Terlama
									</Link>

									<Link
										to=""
										onClick={handleSortDropdown}
										className="block rounded-lg px-4 py-2 text-sm text-clr-text-light hover:bg-clr-container-dark hover:text-clr-text-light"
										role="menuitem">
										Terpopuler
									</Link>

									<Link
										to=""
										onClick={handleSortDropdown}
										className="block rounded-lg px-4 py-2 text-sm text-clr-text-light hover:bg-clr-container-dark hover:text-clr-text-light"
										role="menuitem">
										Rating Tertinggi
									</Link>

									<Link
										to=""
										onClick={handleSortDropdown}
										className="block rounded-lg px-4 py-2 text-sm text-clr-text-light hover:bg-clr-container-dark hover:text-clr-text-light"
										role="menuitem">
										Rating Terendah
									</Link>
								</div>
							</motion.div>
						</div>
						{/* Sort */}
					</div>
					{/* Filter and Sort */}

				</div>
				{/* Filter, Sort and Search */}

				{/*  Blog Cards */}
				<div className='flex flex-wrap w-full gap-6 justify-center xl:justify-between'>
					<Link to='/' >
						<BlogCard
							imageUrl="https://ik.imagekit.io/dimasadiputra/easter-island-1661655_1920.jpg?updatedAt=1754110562285"
							categories={["Lifestyle", "Interior", "Design"]}
							date="2024-04-27"
							title="How to make your workspace more productive"
							description="Creating a productive workspace isn't just about organizing your desk. It's about creating a space that inspires you to work, removing distractions, and ensuring you feel comfortable yet focused in your environment."
							profileImageUrl="https://ik.imagekit.io/dimasadiputra/Profile3.png?updatedAt=1754112815170"
							profileName="Jane Smith"
							profileJob="Workspace Designer"
						/>
					</Link>
					<Link to='/' >
						<BlogCard
							imageUrl="https://ik.imagekit.io/dimasadiputra/army-1550406_1920.jpg?updatedAt=1754110562221"
							categories={["Lifestyle", "Interior", "Design"]}
							date="2024-04-27"
							title="How to make your workspace more productive"
							description="Creating a productive workspace isn't just about organizing your desk. It's about creating a space that inspires you to work, removing distractions, and ensuring you feel comfortable yet focused in your environment."
							profileImageUrl="https://ik.imagekit.io/dimasadiputra/Profile4.png?updatedAt=1754112835660"
							profileName="Jane Smith"
							profileJob="Workspace Designer"
						/>
					</Link>
					<Link to='/' >
						<BlogCard
							imageUrl="https://ik.imagekit.io/dimasadiputra/italy-2940134_1920.jpg?updatedAt=1754110562173"
							categories={["Lifestyle", "Interior", "Design"]}
							date="2024-04-27"
							title="How to make your workspace more productive"
							description="Creating a productive workspace isn't just about organizing your desk. It's about creating a space that inspires you to work, removing distractions, and ensuring you feel comfortable yet focused in your environment."
							profileImageUrl="https://ik.imagekit.io/dimasadiputra/Profile2.png?updatedAt=1754112799495"
							profileName="Jane Smith"
							profileJob="Workspace Designer"
						/>
					</Link>
					<Link to='/' >
						<BlogCard
							imageUrl="https://ik.imagekit.io/dimasadiputra/norway-7887613_1920.jpg?updatedAt=1754110562009"
							categories={["Lifestyle", "Interior", "Design"]}
							date="2024-04-27"
							title="How to make your workspace more productive"
							description="Creating a productive workspace isn't just about organizing your desk. It's about creating a space that inspires you to work, removing distractions, and ensuring you feel comfortable yet focused in your environment."
							profileImageUrl="https://ik.imagekit.io/dimasadiputra/Profile1.png?updatedAt=1754112776792"
							profileName="Jane Smith"
							profileJob="Workspace Designer"
						/>
					</Link>
				</div>
				{/*  Blog Cards */}

				{/* Button unlimited scroll */}
				<div className='flex my-12 justify-center'>
					<Button text={'Lihat lebih banyak'} />
				</div>
				{/* Button unlimited scroll */}
			</div>
		</section>
	)
}

export default Blog
