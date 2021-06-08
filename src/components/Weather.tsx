import React, { FC } from "react";
import { IWeather } from "../interfaces/Interface";

interface Props {
  weather: IWeather;
  handleShow(): void;
}

const Weather: React.FC<Props> = ({ weather, handleShow }) => {
  const iconUrl = `https://openweathermap.org/img/w/${weather.icon}.png`;

  return (
    <div>
      <div className="container my-5">
        <div className="row">
          <div className="col-lg-6 mx-auto">
            <div className="card text-center">
              <div className="card-body text-white">
                <h1 className="text-white">
                  {weather.city},{weather.country}
                </h1>
                <h3 className="text-primary">{weather.description}</h3>
                <h3 className="text-white">{weather.temp}°C</h3>
                <img alt="icon" src={iconUrl} />
                <hr className="horizontal-line" />
                <div className="condition">
                  <h5 className="text-white">
                    Wind at {""}
                    <span>{weather.wind} m/s</span>
                  </h5>
                  <h5 className="text-white">
                    Humidity level at {""}
                    <span>{weather.humidity} %</span>
                  </h5>

                  <h5 className="text-white">
                    <span>{weather.cloudiness}</span>
                  </h5>
                  <h5 className="text-white">
                    <span>{weather.pressure} hpa</span>
                  </h5>
                </div>

                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleShow}
                >
                  Change Location
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Weather;
