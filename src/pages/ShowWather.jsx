import React, { use, useEffect, useState } from "react";
import { getWeather } from "../services/WeatherService";
import { toast } from "react-toastify";
import { TiWeatherPartlySunny } from "react-icons/ti";
import { useParams } from "react-router";
import bgImage from "../assets/bg.jpg";

function ShowWather() {
  const [weatherData, setWeatherData] = useState(undefined);
  const [loading, setLoading] = useState(false);

  const { selectedCity } = useParams();
  const [city, setCity] = useState(selectedCity);

  useEffect(() => {
    setLoading(true);
    getWeather(city)
      .then((response) => {
        console.log(response);
        return response.json();
      })
      .then((data) => {
        console.log(data);
        toast.success("received data");
        setWeatherData(data);
        setLoading(false);
        // ...
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  return (
    <div
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
      }}
      className={`p-10 relative   h-screen flex justify-center`}
    >
      <div className="absolute h-screen w-full bg-black/5 z-0"></div>
      {loading && <h1 className="text-3xl font-bold">Loading Weather...</h1>}
      {weatherData && (
        <div className="flex z-30 flex-col gap-4 justify-center items-center">
          {/* <TiWeatherPartlySunny size={48} /> */}
          <img src={weatherData.current.condition.icon} alt="" />

          <h1 className="text-2xl font-bold">
            {weatherData.current.condition.text}
          </h1>

          <h1>
            Location City:{" "}
            <span className="font-bold">{weatherData.location.name}</span>
          </h1>
          <h1>Location Region: {weatherData.location.region}</h1>
          <h1>Location Country: {weatherData.location.country}</h1>
          <h1>
            Location Position: ( {weatherData.location.lat},
            {weatherData.location.lon} )
          </h1>
          <h1>Location LocalDate: {weatherData.location.localtime}</h1>
          <h1>
            Temp in C:{" "}
            <span className="font-bold text-3xl">
              {weatherData.current.temp_c}
            </span>
          </h1>
          <h1>
            Temp in F:{" "}
            <span className="font-bold text-3xl">
              {weatherData.current.temp_f}
            </span>
          </h1>
        </div>
      )}
    </div>
  );
}

export default ShowWather;
