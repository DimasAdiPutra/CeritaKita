import { LuListFilter } from "react-icons/lu";
import Dropdown from "../../ui/Dropdown";

const SortDropdown = () => {
  const items = [
    { label: "Terbaru" },
    { label: "Terlama" },
    { label: "Terpopuler" },
    { label: "Rating Tertinggi" },
    { label: "Rating Terendah" },
  ];

  const trigger = (
    <button aria-label="filter">
      <LuListFilter size={32} strokeWidth={2} className="text-clr-text-light cursor-pointer" />
    </button>
  );

  return <Dropdown items={items} trigger={trigger} align="end" onSelect={(v) => console.log("Sort:", v)} />;
};

export default SortDropdown;
