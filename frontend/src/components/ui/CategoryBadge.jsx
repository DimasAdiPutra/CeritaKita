import PropTypes from "prop-types";

const CategoryBadge = ({
  category,
  active,
  selectable = false,
  onClick,
}) => {
  const baseStyle =
    "text-xs font-semibold px-3 py-1 rounded-full transition";

  // MODE BADGE (display only)
  if (!selectable) {
    return (
      <span className={`${baseStyle} bg-clr-primary text-clr-text-dark`}>
        {category}
      </span>
    );
  }

  // MODE CHECKLIST / SELECTABLE
  return (
    <button
      type="button"
      onClick={onClick}
      className={`
        ${baseStyle}
        ${active
          ? "bg-clr-primary text-clr-text-dark"
          : "bg-gray-200 text-gray-600 hover:bg-gray-300"
        }
      `}
    >
      {category}
    </button>
  );
};

CategoryBadge.propTypes = {
  category: PropTypes.string.isRequired,
  active: PropTypes.bool,
  selectable: PropTypes.bool,
  onClick: PropTypes.func,
};

export default CategoryBadge;
