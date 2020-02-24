import React, { useState, useEffect } from "react";
import Weather from "./Weather";
import ActionModal from "./ActionModal";
import axios from "axios";

function App() {
  const [location, setLocation] = useState("");
  const [weather, setWeather] = useState({
    city: undefined,
    country: undefined,
    description: undefined,
    temp: undefined,
    icon: undefined,
    humidity: undefined,
    cloudiness: undefined,
    wind: undefined,
    pressure: undefined
  });
  const [loc, setLoc] = useState("Tagbilaran City");
  const [show, setShow] = useState(false);
  const [error, setError] = useState("");
  const [bgColor, setBgColor] = useState("");

  useEffect(() => {
    const bodyElt = document.querySelector("body");
    bodyElt.style.background = `url(${bgColor}) no-repeat center center fixed`;

    const getWeather = () => {
      if (loc === "") {
        setError("Field must not be empty");
      } else {
        axios
          .get(
            `https://api.openweathermap.org/data/2.5/weather?q=${loc}
            
            &appid=2297341e552a6cf9736f3ab3d19248c3&units=metric`
          )
          .then(res => {
            setWeather({
              city: res.data.name,
              country: res.data.sys.country,
              description: res.data.weather[0].main,
              temp: res.data.main.temp,
              icon: res.data.weather[0].icon,
              humidity: res.data.main.humidity,
              wind: res.data.wind.speed,
              cloudiness: res.data.weather[0].description,
              pressure: res.data.main.pressure
            });
            setShow(false);
            setError("");
          })
          .catch(err => {
            if (err.response.status === 404) {
              setError("City not Found");
            }
          });
      }
    };
    getWeather();

    const setbackgroundImage = () => {
      let color;
      const conditions = weather.description;
      switch (conditions) {
        case "Clear":
          color = "./images/clear.jpeg";
          break;

        case "Clouds":
          color = "./images/cloudy.jpeg";
          break;

        case "Rain":
        case "Drizzle":
        case "Mist":
        case "Smoke":
        case "Haze":
        case "Dust":
        case "Fog":
        case "Sand":
        case "Ash":
        case "Squall":
        case "Tornado":
          color = "./images/rain.jpeg";
          break;

        case "Thunderstorm":
          color = "./images/storm.jpeg";
          break;

        case "Snow":
          color = "./images/snow.jpeg";
          break;

        default:
          color = "./images/water-blue-ocean.jpg";
      }

      setBgColor(color);
    };

    setbackgroundImage();
  }, [bgColor, loc, weather.description]);

  const handleShow = () => {
    setShow(true);
  };

  const onHide = () => {
    setShow(false);
    setError("");
  };

  const handleChange = e => {
    setLocation(e.target.value);
  };

  const handleChangeLocation = () => {
    setLoc(location);
  };
  return (
    <div>
      <Weather
        city={weather.city}
        country={weather.country}
        description={weather.description}
        temp={weather.temp}
        icon={weather.icon}
        humidity={weather.humidity}
        wind={weather.wind}
        cloudiness={weather.cloudiness}
        pressure={weather.pressure}
        handleShow={handleShow}
      />
      <ActionModal
        show={show}
        onHide={onHide}
        location={location}
        handleChange={handleChange}
        handleChangeLocation={handleChangeLocation}
        error={error}
      />
    </div>
  );
}

export default App;
