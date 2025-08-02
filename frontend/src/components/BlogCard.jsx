import clsx from "clsx";
import { IKImage } from "imagekitio-react";

// Helper function to extract the path from a full ImageKit URL
const getImageKitPath = (url) => {
  if (!url) return "";
  const parts = url.split("ik.imagekit.io/dimasadiputra/");
  return parts.length > 1 ? parts[1] : "";
};

const BlogCard = ({
  className,
  imageUrl,
  categories = [],
  date = "2022-10-10",
  title = "Blog Title",
  description = "Blog description goes here...",
  profileImageUrl,
  profileName = "John Doe",
  profileJob = "Content Writer",
}) => {
  const truncateDescription = (text, maxWords) => {
    const words = text.trim().split(/\s+/);
    if (words.length <= maxWords) return text;
    return words.slice(0, maxWords).join(" ") + " ...";
  }

  const blogImageKitPath = getImageKitPath(imageUrl);
  const profileImageKitPath = getImageKitPath(profileImageUrl);

  return (
    <article
      className={clsx(
        "relative overflow-hidden rounded-lg shadow-sm transition hover:shadow-lg w-full max-w-[375px] cursor-pointer",
        className
      )}
    >
      {/* Gambar utama dengan overlay, menggunakan komponen IKImage */}
      <div className="relative after:absolute after:inset-0 after:bg-clr-container-dark/10 after:content-[''] after:rounded-t-lg">
        {blogImageKitPath ? (
          <IKImage
            path={blogImageKitPath}
            alt={title}
            className="h-56 w-full object-cover rounded-t-lg"
            width="w-auto"
            crop="at_least"
            dpr='2'
          />
        ) : (
          <img
            alt={title}
            src="https://via.placeholder.com/400x300?text=No+Image"
            className="h-56 w-full object-cover rounded-t-lg"
          />
        )}

        {/* Menampilkan kategori sebagai beberapa badge */}
        <div className="absolute top-2 right-2 space-x-2 z-10">
          {categories.map((category, index) => (
            <span
              key={index}
              className="bg-clr-primary text-clr-text-dark text-xs font-semibold px-3 py-1 rounded-full"
            >
              {category}
            </span>
          ))}
        </div>
      </div>

      {/* Konten card */}
      <div className="bg-clr-container-light p-4 sm:p-6">
        <time dateTime={date} className="block text-xs text-clr-text-light">
          {new Date(date).toLocaleDateString("en-US", {
            day: "numeric",
            month: "short",
            year: "numeric",
          })}
        </time>

        <h3 className="mt-0.5 text-lg font-semibold text-clr-text-light">
          {title}
        </h3>

        <p className="mt-2 line-clamp-3 text-sm text-clr-text-light">
          {truncateDescription(description, 25)}
        </p>

        {/* Profile user, menggunakan komponen IKImage */}
        <div className="mt-4 flex items-center gap-3">
          {profileImageKitPath ? (
            <IKImage
              path={profileImageKitPath}
              alt={profileName}
              className="h-10 w-10 rounded-full object-cover"
              width="40"
              height="40"
              radius="max"
            />
          ) : (
            <img
              alt={profileName}
              src="https://via.placeholder.com/40x40?text=User"
              className="h-10 w-10 rounded-full object-cover"
            />
          )}
          <div className="text-sm">
            <p className="text-clr-text-light font-medium">{profileName}</p>
            <p className="text-clr-text-light text-xs">{profileJob}</p>
          </div>
        </div>
      </div>
    </article>
  );
};

export default BlogCard;