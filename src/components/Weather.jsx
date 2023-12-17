import { useState, useEffect, useContext } from "react";
import { DarkModeContext } from "../contexts/DarkModeContext";
import { fetchWeatherData } from "../api";
import DeviceThermostatOutlinedIcon from "@mui/icons-material/DeviceThermostatOutlined";
import WbSunnyOutlinedIcon from "@mui/icons-material/WbSunnyOutlined";
import ModeNightOutlinedIcon from "@mui/icons-material/ModeNightOutlined";
import FilterDramaOutlinedIcon from "@mui/icons-material/FilterDramaOutlined";

const Weather = () => {
  const { isDarkMode } = useContext(DarkModeContext);
  const [weatherData, setWeatherData] = useState("");
  const [currentTime, setCurrentTime] = useState("");

  useEffect(() => {
    const manchesterCoordinates = { latitude: 53.483959, longitude: -2.244644 };
    fetchWeatherData(
      manchesterCoordinates.latitude,
      manchesterCoordinates.longitude
    ).then((data) => {
      setWeatherData(data);
    });
    const intervalId = setInterval(() => {
      const now = new Date();
      const formattedTime = now.toLocaleTimeString();
      setCurrentTime(formattedTime);
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  const isDaytime = (time) => {
    const [hours] = time.split(":");
    const hoursNumber = +hours;
    return hoursNumber >= 6 && hoursNumber < 19;
  };

  return (
    <div
      className={`bg-mode ${
        isDarkMode ? "dark text-secondary" : "light text-primary"
      } italic text-sm p-5`}
    >
      <p>
        {" "}
        {isDaytime(currentTime) ? (
          <WbSunnyOutlinedIcon />
        ) : (
          <ModeNightOutlinedIcon />
        )}{" "}
        {weatherData.name} Current Time: {currentTime}
      </p>
      {weatherData && (
        <>
          <p>
            <FilterDramaOutlinedIcon /> {weatherData.name} Current Weather:{" "}
            {weatherData.weather[0].description}
          </p>
          <p>
            <DeviceThermostatOutlinedIcon /> {weatherData.name} Current
            Temperature: {weatherData.main.temp} °C
          </p>
        </>
      )}
    </div>
  );
};

export default Weather;
