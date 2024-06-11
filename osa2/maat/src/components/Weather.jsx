import { useEffect, useState } from "react";
import weatherService from "../services/weathers";

const Weather = ({ country }) => {
  const [weatherData, setWeatherData] = useState(null);
  const [fetchError, setFetchError] = useState(null);

  useEffect(() => {
    if (country) {
      weatherService
        .getCapital(country)
        .then(response => {
          setWeatherData(response);
        })
        .catch(error => {
          setFetchError('Error fetching weather data');
        });
    }
  }, [country]);

  if (fetchError) {
    return <div>{fetchError}</div>;
  }

  if (!weatherData) {
    return <div>Loading weather...</div>;
  }

  return (
    <div>
      <h3>Weather in {country.name.common}</h3>
      <p>Temperature: {(weatherData.main.temp - 273.15).toFixed(2)}° Celsius</p>
      <img
        src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
        alt={`Image of ${weatherData.weather[0].description}`}
      />
      <p>Description: <b>{weatherData.weather[0].main}</b></p>
      <p>Wind: {weatherData.wind.speed} m/seg</p>
    </div>
  );
};

export default Weather;
