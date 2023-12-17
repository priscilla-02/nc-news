import { useContext } from "react";
import { DarkModeContext } from "../contexts/DarkModeContext";

const DarkModeToggle = () => {
  const { isDarkMode, toggleDarkMode } = useContext(DarkModeContext);

  return (
    <div className="relative w-20 ml-8 py-3 h-10 align-middle select-none transition duration-200 ease-in">
      <input
        type="checkbox"
        name="toggle"
        id="toggle"
        className="toggle-checkbox absolute block w-8 h-8 mb-5 rounded-full bg-sky-600 border-4 appearance-none cursor-pointer transition-transform"
        checked={isDarkMode}
        onChange={toggleDarkMode}
        style={{
          transform: isDarkMode ? "translateX(0)" : "translateX(150%)",
        }}
      />
      <label
        htmlFor="toggle"
        className={`toggle-label flex items-center justify-between h-7 rounded-full bg-gray-400 cursor-pointer`}
      >
        <span className="ml-2" style={{ fontSize: "25px" }}>
          🌞
        </span>
        <span className="mr-2" style={{ fontSize: "25px" }}>
          🌜
        </span>
      </label>
    </div>
  );
};

export default DarkModeToggle;
