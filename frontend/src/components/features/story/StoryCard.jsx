// src/features/story/StoryCard.jsx
import clsx from "clsx";
import PropTypes from "prop-types";
import ImageWithFallback from "../../ui/ImageWithFallback";
import CategoryBadge from "../../ui/CategoryBadge";
import ProfileSection from "../../ui/ProfileSection";
import { getImageKitPath } from "@/utils/imagekit";

/* truncate by words */
const truncateDescription = (text = "", maxWords = 25) => {
  const words = text.trim().split(/\s+/).filter(Boolean);
  return words.length <= maxWords
    ? text
    : words.slice(0, maxWords).join(" ") + " …";
};

const StoryCard = ({
  className = "",
  coverImage,
  tags = [],
  publishedAt,
  title,
  excerpt,
  author,
}) => {
  const coverPath = getImageKitPath(coverImage?.url);
  const avatarPath = getImageKitPath(author?.avatar);

  return (
    <article
      className={clsx(
        "relative overflow-hidden rounded-lg shadow-sm transition hover:shadow-lg w-full max-w-[375px]",
        className
      )}
    >
      {/* COVER */}
      <div className="relative">
        <ImageWithFallback
          path={coverPath}
          alt={title}
          className="h-56 w-full object-cover rounded-t-lg"
          fallback="https://via.placeholder.com/400x300?text=No+Image"
        />

        <div className="absolute top-2 right-2 flex gap-2 z-10">
          {tags.map((tag) => (
            <CategoryBadge key={tag} category={tag} />
          ))}
        </div>
      </div>

      {/* CONTENT */}
      <div className="bg-clr-container-light p-4 sm:p-6">
        {publishedAt && (
          <time
            dateTime={publishedAt}
            className="block text-xs text-clr-text-light"
          >
            {new Date(publishedAt).toLocaleDateString("id-ID", {
              day: "numeric",
              month: "short",
              year: "numeric",
            })}
          </time>
        )}

        <h3 className="mt-1 text-lg font-semibold text-clr-text-light">
          {title}
        </h3>

        <p className="mt-2 line-clamp-3 text-sm text-clr-text-light">
          {truncateDescription(excerpt)}
        </p>

        {author && (
          <ProfileSection
            imagePath={avatarPath}
            profileName={author.name}
            profileJob={author.job}
          />
        )}
      </div>
    </article>
  );
};

StoryCard.propTypes = {
  coverImage: PropTypes.object,
  tags: PropTypes.arrayOf(PropTypes.string),
  publishedAt: PropTypes.string,
  title: PropTypes.string.isRequired,
  excerpt: PropTypes.string,
  author: PropTypes.shape({
    name: PropTypes.string,
    avatar: PropTypes.string,
    job: PropTypes.string,
  }),
};

export default StoryCard;
