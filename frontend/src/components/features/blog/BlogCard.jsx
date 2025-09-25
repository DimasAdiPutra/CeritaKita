// src/features/blog/BlogCard.jsx
import clsx from "clsx";
import PropTypes from "prop-types";
import ImageWithFallback from "../../ui/ImageWithFallback";
import CategoryBadge from "../../ui/CategoryBadge";
import ProfileSection from "../../ui/ProfileSection";

/* why: extrak path ImageKit dari URL penuh */
const getImageKitPath = (url) => {
  if (!url) return "";
  const parts = url.split("ik.imagekit.io/dimasadiputra/");
  return parts.length > 1 ? parts[1] : "";
};

/* why: sederhana, truncate by words */
const truncateDescription = (text = "", maxWords = 25) => {
  const words = text.trim().split(/\s+/).filter(Boolean);
  return words.length <= maxWords ? text : words.slice(0, maxWords).join(" ") + " ...";
};

/* default props moved into function parameters to avoid React warning */
const BlogCard = ({
  className = "",
  imageUrl = "",
  categories = [],
  date = "2022-10-10",
  title = "Blog Title",
  description = "Blog description goes here...",
  profileImageUrl = "",
  profileName = "John Doe",
  profileJob = "Content Writer",
}) => {
  const blogImageKitPath = getImageKitPath(imageUrl);
  const profileImageKitPath = getImageKitPath(profileImageUrl);

  return (
    <article
      className={clsx(
        "relative overflow-hidden rounded-lg shadow-sm transition hover:shadow-lg w-full max-w-[375px] cursor-pointer",
        className
      )}
    >
      <div className="relative after:absolute after:inset-0 after:bg-clr-container-dark/10 after:content-[''] after:rounded-t-lg">
        <ImageWithFallback
          path={blogImageKitPath}
          alt={title}
          className="h-56 w-full object-cover rounded-t-lg"
          fallback="https://via.placeholder.com/400x300?text=No+Image"
        />

        <div className="absolute top-2 right-2 space-x-2 z-10">
          {categories.map((category, index) => (
            <CategoryBadge key={index} category={category} />
          ))}
        </div>
      </div>

      <div className="bg-clr-container-light p-4 sm:p-6">
        <time dateTime={date} className="block text-xs text-clr-text-light">
          {new Date(date).toLocaleDateString("en-US", {
            day: "numeric",
            month: "short",
            year: "numeric",
          })}
        </time>

        <h3 className="mt-0.5 text-lg font-semibold text-clr-text-light">{title}</h3>

        <p className="mt-2 line-clamp-3 text-sm text-clr-text-light">
          {truncateDescription(description, 25)}
        </p>

        <ProfileSection
          imagePath={profileImageKitPath}
          profileName={profileName}
          profileJob={profileJob}
        />
      </div>
    </article>
  );
};

BlogCard.propTypes = {
  className: PropTypes.string,
  imageUrl: PropTypes.string,
  categories: PropTypes.arrayOf(PropTypes.string),
  date: PropTypes.string,
  title: PropTypes.string,
  description: PropTypes.string,
  profileImageUrl: PropTypes.string,
  profileName: PropTypes.string,
  profileJob: PropTypes.string,
};

export default BlogCard;
