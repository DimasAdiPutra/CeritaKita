import PropTypes from "prop-types";

const CategoryBadge = ({ category, active, onClick }) => (
  <button
    type="button"
    onClick={onClick}
    className={`text-xs font-semibold px-3 py-1 rounded-full transition
      ${active
        ? "bg-clr-primary text-clr-text-dark"
        : "bg-gray-200 text-gray-600 hover:bg-gray-300"
      }`}
  >
    {category}
  </button>
);

CategoryBadge.propTypes = {
  category: PropTypes.string.isRequired,
  active: PropTypes.bool,
  onClick: PropTypes.func,
};

export default CategoryBadge;
