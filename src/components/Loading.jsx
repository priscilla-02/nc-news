import { useContext } from "react";
import { DarkModeContext } from "../contexts/DarkModeContext";
import HourglassBottomTwoToneIcon from "@mui/icons-material/HourglassBottomTwoTone";

const Loading = () => {
  const { isDarkMode } = useContext(DarkModeContext);

  return (
    <div
      className={`bg-mode ${isDarkMode ? "dark" : "light"} min-h-[150px] pt-14`}
    >
      <HourglassBottomTwoToneIcon
        className="animate-pulse"
        style={{
          color: isDarkMode ? "#fff" : "#0284C7",
        }}
      />
      <span
        className={`text-xl py-50 ${
          isDarkMode ? "text-secondary" : "text-primary"
        }`}
      >
        Loading...
      </span>
    </div>
  );
};

export default Loading;
