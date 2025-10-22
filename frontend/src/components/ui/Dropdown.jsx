// src/ui/Dropdown.jsx
import { motion } from "motion/react";
import PropTypes from "prop-types";
import { Link } from "react-router";
import { useState } from "react";

const Dropdown = ({ items, trigger, align = "end", onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => setIsOpen((prev) => !prev);
  const handleClose = () => setIsOpen(false);

  return (
    <div className="relative w-max flex items-center">
      {/* Trigger */}
      <div onClick={handleToggle} className="cursor-pointer">
        {trigger}
      </div>

      {/* Menu */}
      <motion.div
        initial={{ height: 0 }}
        animate={{ height: isOpen ? "auto" : 0 }}
        exit={{ height: 0 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className={`absolute top-full h-full z-50 w-max rounded-md bg-clr-container-light shadow-2xl overflow-hidden 
          ${align === "end" ? "end-0" : "start-[50%] md:start-auto md:end-0"}`}
        role="menu"
      >
        <div className="p-2">
          {items.map(({ label, to }, idx) => (
            <Link
              key={idx}
              to={to || ""}
              onClick={() => {
                handleClose();
                onSelect?.(label);
              }}
              className="block rounded-lg px-4 py-2 text-sm text-clr-text-light hover:bg-clr-container-dark hover:text-clr-text-dark"
              role="menuitem"
            >
              {label}
            </Link>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

Dropdown.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      to: PropTypes.string,
    })
  ).isRequired,
  trigger: PropTypes.node.isRequired,
  align: PropTypes.oneOf(["start", "end"]),
  onSelect: PropTypes.func,
};

export default Dropdown;
