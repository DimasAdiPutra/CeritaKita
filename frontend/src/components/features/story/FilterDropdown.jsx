import { IoIosArrowDown } from "react-icons/io";
import Dropdown from "../../ui/Dropdown";

const FilterDropdown = () => {
  const items = [
    { label: "Semua" },
    { label: "Destinasi" },
    { label: "Kuliner" },
    { label: "Lifestyle" },
    { label: "Tips & Hacks" },
  ];

  const trigger = (
    <div className="flex items-center overflow-hidden border border-clr-container-dark rounded px-2 py-2 text-clr-text-light hover:bg-gray-50">
      <span className="pr-2">Semua</span>
      <IoIosArrowDown size={18} strokeWidth={1.5} className="text-black" />
    </div>
  );

  return <Dropdown items={items} trigger={trigger} align="start" onSelect={(v) => console.log("Filter:", v)} />;
};

export default FilterDropdown;
