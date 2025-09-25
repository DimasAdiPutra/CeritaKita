// components/features/blog/BlogList.jsx
import { Link } from "react-router";
import BlogCard from "./BlogCard";

const BlogList = ({
  stories = [],
  loading = false,
  error = null,
  layout = "grid", // grid | flex
}) => {
  if (loading) {
    return (
      <div className="col-span-full text-center py-12">
        <p className="text-subtitle">Memuat cerita...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="col-span-full text-center py-12">
        <p className="text-subtitle text-red-600">
          Gagal memuat cerita: {error.message || "Terjadi kesalahan"}
        </p>
      </div>
    );
  }

  if (stories.length === 0) {
    return (
      <div className="col-span-full text-center py-12">
        <p className="text-subtitle">Tidak ada cerita ditemukan</p>
      </div>
    );
  }

  return (
    <div
      className={
        layout === "grid"
          ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          : "flex flex-wrap w-full gap-6 justify-center xl:justify-between"
      }
    >
      {stories.map((story) => (
        <Link to={`/story/${story.slug}`} key={story._id} className="block">
          <BlogCard
            imageUrl={story.coverImage}
            categories={story.tags}
            date={story.publishedAt}
            title={story.title}
            description={story.excerpt}
            profileImageUrl={story.author?.avatar}
            profileName={story.author?.name}
            profileJob={story.author?.job}
          />
        </Link>
      ))}
    </div>
  );
};

export default BlogList;
