import PropTypes from "prop-types";

const CategoryBadge = ({ category }) => (
  <span className="bg-clr-primary text-clr-text-dark text-xs font-semibold px-3 py-1 rounded-full">
    {category}
  </span>
);

CategoryBadge.propTypes = {
  category: PropTypes.string.isRequired,
};

export default CategoryBadge;
