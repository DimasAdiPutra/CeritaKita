import { Helmet } from 'react-helmet-async'
import { useEffect, useState } from "react";
import { getStories } from "../services/api";
import { FiSearch } from 'react-icons/fi';
import Input from '../components/Input';
import { IoIosArrowDown } from 'react-icons/io';
import { Link } from 'react-router'
import { motion } from 'motion/react'
import { LuListFilter } from 'react-icons/lu';
import BlogCard from '../components/BlogCard';


const BlogPage = () => {

	const [stories, setStories] = useState([]);
	const [loading, setLoading] = useState(true);

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

	useEffect(() => {
		getStories()
			.then((res) => {
				setStories(res.data);
				setLoading(false);
			})
			.catch((err) => {
				console.error("Gagal fetch stories:", err);
				setLoading(false);
			});
	}, []);

	console.log(stories)

	if (loading) return <p className="text-center mt-10">Loading...</p>;


	return (
		<>
			<Helmet>
				<title>Blog - CeritaKita</title>
			</Helmet>

			<div className='mt-20 container py-10'>
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

				<div className="flex flex-wrap w-full gap-6 justify-center xl:justify-between">

					{stories.data.map((story) => (
						<Link to={`/${story.slug}`} key={story._id} >
							<BlogCard
								imageUrl={story.coverImage}
								categories={story.tags}
								date={story.publishedAt}
								title={story.title}
								description={story.excerpt}
								profileImageUrl={story.author.avatar}
								profileName={story.author.name}
								profileJob={story.author.job}
							/>
						</Link>
					))}

				</div>
			</div>
		</>
	);
}

export default BlogPage
