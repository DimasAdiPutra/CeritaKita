// src/features/story/StoryList.jsx
import { Link } from "react-router";
import StoryCard from "./StoryCard";

const StoryList = ({
  stories = [],
  loading = false,
  error = null,
  layout = "grid",
}) => {
  if (loading) {
    return <p className="text-center py-12">Memuat cerita…</p>;
  }

  if (error) {
    return (
      <p className="text-center py-12 text-red-600">
        Gagal memuat cerita
      </p>
    );
  }

  const publishedStories = stories.filter(
    (story) => story.status === "published"
  );

  if (publishedStories.length === 0) {
    return <p className="text-center py-12">Belum ada cerita</p>;
  }

  return (
    <div
      className={
        layout === "grid"
          ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          : "flex flex-wrap gap-6 justify-center"
      }
    >
      {publishedStories.map((story) => (
        <Link
          to={`/story/${story.slug}`}
          key={story._id}
          className="block"
        >
          <StoryCard
            coverImage={story.coverImage}
            categories={story.categories}
            publishedAt={story.publishedAt}
            title={story.title}
            excerpt={story.excerpt}
            author={story.author}
          />
        </Link>
      ))}
    </div>
  );
};

export default StoryList;
