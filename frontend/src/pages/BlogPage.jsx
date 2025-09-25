// src/pages/BlogPage.jsx
import { Helmet } from "react-helmet-async";
import { useEffect, useState } from "react";
import { FiSearch } from "react-icons/fi";

import Input from "../components/ui/Input";
import FilterDropdown from "../components/features/blog/FilterDropdown";
import SortDropdown from "../components/features/blog/SortDropdown";

import { getStories } from "../services/stories.api";
import BlogList from "../components/features/blog/BlogList";

const BlogPage = () => {
	const [stories, setStories] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState("");

	useEffect(() => {
		const loadData = async () => {
			try {
				const data = await getStories();
				setStories(data);
			} catch (err) {
				console.error(err);
				setError(err);
			} finally {
				setLoading(false);
			}
		};
		loadData();
	}, []);

	return (
		<>
			<Helmet>
				<title>Blog - CeritaKita</title>
			</Helmet>

			<div className="mt-20 container py-10">
				{/* Header Section */}
				<div className="text-center mb-12">
					<h1 className="text-titlepage font-bold mb-4">
						Jelajahi Cerita dari Komunitas
					</h1>
					<p className="text-body-base max-w-2xl mx-auto">
						Temukan inspirasi dan pengalaman menarik dari berbagai penulis di CeritaKita
					</p>
				</div>

				{/* Filter, Sort and Search */}
				<div className="md:flex md:items-center md:justify-between md:gap-3 mb-10">
					{/* Input Search */}
					<div className="max-w-md w-full">
						<Input
							iconLeft={<FiSearch size={16} strokeWidth={1.6} className="text-clr-text-light" />}
							id="cardSearch"
							label="Search"
							type="text"
							placeholder="Cari Cerita"
							className="w-full"
						/>
					</div>

					{/* Filter and Sort */}
					<div className="flex w-full justify-between mt-8 md:mt-0">
						<FilterDropdown />
						<SortDropdown />
					</div>
				</div>

				{/* Blog Cards */}
				<BlogList stories={stories} loading={loading} error={error} layout="grid" />
			</div>
		</>
	);
};

export default BlogPage;
