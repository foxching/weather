import React, { ChangeEvent, useState, useEffect } from "react";
import axios from "axios";
import Weather from "./components/Weather";
import ActionModal from "./components/ActionModal";
import { IWeather } from "./interfaces/Interface";

function App() {
  const [weather, setWeather] = useState<IWeather>({
    city: undefined,
    country: undefined,
    description: undefined,
    temp: undefined,
    icon: undefined,
    humidity: undefined,
    cloudiness: undefined,
    wind: undefined,
    pressure: undefined,
  });
  const [location, setLocation] = useState<string>("");
  const [loc, setLoc] = useState<string>("Manila");
  const [show, setShow] = useState<boolean>(false);
  const [error, setError] = useState<string | undefined>("");
  const [bgColor, setBgColor] = useState<string | undefined>("");

  const handleShow = (): void => {
    setShow(true);
    setLocation("");
  };

  const onHide = (): void => {
    setShow(false);
    setError("");
  };

  const handleChangeLocation = () => {
    setLoc(location);
  };

  useEffect(() => {
    const bodyElt = document.querySelector("body");
    bodyElt.style.background = `url(${bgColor}) no-repeat center center fixed`;

    const getWeather = async () => {
      try {
        if (loc === "") {
          setError("Field must not be empty");
        } else {
          const res = await axios.get(
            `https://api.openweathermap.org/data/2.5/weather?q=${loc}&appid=2297341e552a6cf9736f3ab3d19248c3&units=metric`
          );
          setWeather({
            city: res.data.name,
            country: res.data.sys.country,
            description: res.data.weather[0].main,
            temp: res.data.main.temp,
            icon: res.data.weather[0].icon,
            humidity: res.data.main.humidity,
            wind: res.data.wind.speed,
            cloudiness: res.data.weather[0].description,
            pressure: res.data.main.pressure,
          });
          setShow(false);
          setError("");
        }
      } catch (err) {
        if (err.response.status === 404) {
          setError("City not Found");
        }
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

  return (
    <div className="appContainer">
      <Weather weather={weather} handleShow={handleShow} />
      <ActionModal
        show={show}
        setLocation={setLocation}
        onHide={onHide}
        location={location}
        handleChangeLocation={handleChangeLocation}
        error={error}
      />
    </div>
  );
}

export default App;
