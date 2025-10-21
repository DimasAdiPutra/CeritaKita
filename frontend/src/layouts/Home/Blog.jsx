// layouts/Home/Blog.jsx
import { useState, useEffect } from "react";

// Components
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import FilterDropdown from "../../components/features/blog/FilterDropdown";
import SortDropdown from "../../components/features/blog/SortDropdown";

// Icons
import { FiSearch } from "react-icons/fi";

// Services
import { getStories } from "../../services/stories.api";
import BlogList from "../../components/features/blog/BlogList";
import { dgerror } from "../../utils/logger";

const Blog = () => {
	const [stories, setStories] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState("");

	useEffect(() => {
		const loadData = async () => {
			try {
				const data = await getStories();
				setStories(data);
			} catch (err) {
				dgerror(err);
				setError(err);
			} finally {
				setLoading(false);
			}
		};

		loadData();
	}, []);

	return (
		<section className="pt-16">
			<div className="container">
				{/* Judul */}
				<h2 className="text-subtitle mb-4">
					Bacalah, Nikmati, dan Bagikan Ceritamu
				</h2>

				{/* Paragraf */}
				<p className="text-body-base mb-7">
					Cerita yang kamu cari ada di sini. Biarkan pengalaman dari CeritaKita
					menghibur, menginspirasi, dan memotivasi.
				</p>

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
						placeholder="Cari Cerita"
					/>

					{/* Filter and Sort */}
					<div className="flex w-full justify-between mt-8 md:mt-0">
						<FilterDropdown />
						<SortDropdown />
					</div>
				</div>

				{/* Blog Cards */}
				<BlogList stories={stories} loading={loading} error={error} layout="flex" />


				{/* Button unlimited scroll */}
				<div className="flex my-12 justify-center">
					<Button text="Lihat lebih banyak" />
				</div>
			</div>
		</section>
	);
};

export default Blog;
