import { useContext } from "react";
import { DarkModeContext } from "../contexts/DarkModeContext";
import HourglassBottomTwoToneIcon from "@mui/icons-material/HourglassBottomTwoTone";

const Loading = () => {
  const { isDarkMode } = useContext(DarkModeContext);
  return (
    <div className={`bg-mode ${isDarkMode ? "dark" : "light"}`}>
      <HourglassBottomTwoToneIcon className="animate-pulse" />
      <span className="text-xl py-50">Loading...</span>
    </div>
  );
};

export default Loading;
