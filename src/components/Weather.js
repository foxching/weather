import React from "react";

function Weather({
  city,
  country,
  description,
  temp,
  humidity,
  wind,
  cloudiness,
  pressure,
  icon,
  handleShow
}) {
  const iconUrl = `https://openweathermap.org/img/w/${icon}.png`;
  return (
    <div>
      <div className="container my-5">
        <div className="row">
          <div className="col-lg-6 mx-auto">
            <div className="card text-center">
              <div className="card-body">
                <h1 className="text-white">
                  {city},{country}
                </h1>
                <h3 className="text-primary">{description}</h3>
                <h3 className="text-white">{temp}°C</h3>
                <img alt="icon" src={iconUrl} />
                <ul className="list-group text-white">
                  <li className="list-group-item">Humidity:{humidity} %</li>
                  <li className="list-group-item">Wind:{wind} m/s</li>
                  <li className="list-group-item text-capitalize">
                    Cloudiness:{cloudiness}
                  </li>
                  <li className="list-group-item">Pressure:{pressure} hpa</li>
                </ul>
                <hr />
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
}

export default Weather;
