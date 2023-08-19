import React, { useState, useEffect } from "react";
import "./Weather.css";

const weatherBG = {
  Mist: "mist-bg",
  Sunny: "sunny-bg",
  Cloudy: "cloudy-bg",
  PartlyCloudy: "partly-cloudy-bg",
  Rain: "rain-bg",
  Windy: "windy-bg",
  LightRain: "light-rain-bg",
  Clear: "clear-bg",
  Thunderstorm: "thunderstorm.jpg",
  Default: "default-bg",
};

const Weather = (props) => {
  let [City, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [bgClass, setBgClass] = useState("default-bg");

  const onChange = (event) => {
    setCity(event.target.value);
  };

  const BackgroundSetter = () => {
    if (weatherData && weatherData.current) {
      let weatherCondition = weatherData.current.condition.text;
      if (weatherCondition.toLowerCase().includes("rain")) {
        weatherCondition = "LightRain";
      }
      if (weatherCondition === "Partly Cloudy") {
        weatherCondition = "PartlyCloudy";
      }
      if (weatherCondition.toLowerCase().includes('thunder')) {
        weatherCondition = "Thunderstorm";
      }
      setBgClass(weatherBG[weatherCondition] || "default-bg");
    }
  };

  const fetchWeather = async () => {
    setError(null);
    setWeatherData(null);
    setLoading(true);
    try {
      const res = await fetch(
        `https://api.weatherapi.com/v1/current.json?key=cd45c0cdb9eb4eacaf1160624231608&q=${City}`
      );
      const data = await res.json();
      if (data.error) {
        setLoading(false);
        setError(data.error.message);
      }
      setWeatherData(data);
      setLoading(false);
    } catch (err) {
      console.log("Error occured", err);
    }
  };

  const fetchLocation = async () => {
    setLoading(true);
    const ipRes = await fetch("https://ipinfo.io/?token=6609b964717a93");
    const ipData = await ipRes.json();
    if (ipData.city === "Delhi") {
      // Done because there is Delhi in Canada as well
      ipData.city = "New Delhi";
    }
    City = ipData.city;
    fetchWeather();
    setLoading(false);
  };

  useEffect(() => {
    fetchLocation();
  }, []);

  useEffect(() => {
    BackgroundSetter();
  }, [weatherData]);

  useEffect(() => {
    document.body.className = bgClass;
  }, [bgClass]);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchWeather();
  };

  return (
    <div className="w-[21rem] md:w-[37rem] mx-auto bg-white bg-opacity-60 mt-28 border-gray-900 border-2 rounded-2xl shadow-2xl shadow-gray-950/80 py-4 backdrop-blur-sm">
      <div className={`text-center`}>
        <form onSubmit={handleSearch}>
          <input
            className="block mx-auto md:inline outline-gray-950 border-gray-900 border-2 bg-gray-100 rounded-full text-2xl mt-1 md:mt-7 mb-2 md:mx-2 p-3 md:p-4 w-72 md:w-96"
            type="text"
            onChange={onChange}
            value={City}
            placeholder="Search your city..."
          />
          <button
            className="border-gray-900 border-2 bg-gray-900 rounded-full text-white text-2xl mb-2 px-6 p-3 md:p-4 shadow-lg shadow-indigo-700/40 hover:shadow-indigo-500/80 hover:shadow:xl"
            type="submit"
            disabled={City.length === 0}
          >
            Search
          </button>
        </form>
      </div>

      {loading && (
        <img className="m-auto mt-10" src="/loading.gif" alt="loading" />
      )}
      {loading && <div className="h-[24vh]"></div>}

      {weatherData &&
        (error ? (
          <div className="text-3xl text-center">{error}</div>
        ) : (
          <div className="text-center text-2xl">
            <p className="text-5xl md:text-6xl">{weatherData.location.name}</p>
            <p className="mb-2">
              {weatherData.location.region}, {weatherData.location.country}
            </p>

            {weatherData.location.localtime}

            <p>
              <img
                className="inline w-22 h-22 shadow-2xl rounded-full p-2 shadow-black/80"
                src={weatherData.current.condition.icon}
                alt="img"
              />
            </p>
            <p>{weatherData.current.condition.text}</p>

            <p className="text-5xl my-2 font-bold">
              {weatherData.current.temp_c} &deg;C
            </p>

            <div className="flex mx-auto flex-col">
              <div className="flex mx-auto flex-col md:flex-row">
                <p>
                  <b>Wind Speed</b> : {weatherData.current.wind_kph} Km/h&nbsp;
                  &nbsp;
                </p>{" "}
                <p>
                  <b>Humidity</b> : {weatherData.current.humidity}
                </p>
              </div>
              <div className="flex mx-auto flex-col md:flex-row">
                <p>
                  <b>Pressure</b> : {weatherData.current.pressure_mb} mb&nbsp;
                  &nbsp;
                </p>
                <p>
                  <b>Wind direction</b> : {weatherData.current.wind_dir}
                </p>
              </div>
            </div>
          </div>
        ))}
      {error && <div className="h-[50vh]"></div>}
    </div>
  );
};

export default Weather;