import React, { useState } from "react";
import { TiWeatherPartlySunny } from "react-icons/ti";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
function Home() {
  const [location, setLocation] = useState("");
  const navigate = useNavigate();

  function handleChange(event) {
    setLocation(event.target.value);
  }
  return (
    <div className="p-10 items-center gap-4 flex flex-col justify-center">
      <TiWeatherPartlySunny size={50} />
      <h1 className="text-3xl font-semibold">Welcome to Weather App</h1>

      {/* city selection */}
      <div className="flex gap-1 flex-col mt-10">
        <label htmlFor="">Enter location</label>
        <input
          onChange={handleChange}
          className="px-4 py-2 w-[400px] rounded  bg-gray-700"
          type="text"
          placeholder="Enter here"
        />
      </div>

      <div>
        <button
          onClick={() => {
            if (location.trim() == "") {
              toast.error("Location required");
              return;
            }

            navigate(`/weather/${location}`);
          }}
          className="bg-gray-950 cursor-pointer text-white px-3 py-2 rounded-2xl hover:bg-gray-800"
        >
          Show Weather
        </button>
      </div>
    </div>
  );
}

export default Home;
