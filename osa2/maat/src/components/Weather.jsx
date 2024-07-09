import React, { useState, useEffect } from 'react';
import weatherService from '../services/weatherService';

const Weather = ({ capital }) => {
    const [weather, setWeather] = useState(null);

    useEffect(() => {
        weatherService.getWeather(capital)
            .then(data => {
                setWeather(data);
            })
            .catch(error => {
                console.error('Error fetching weather data:', error);
            });
    }, [capital]);

    if (!weather) {
        return <div>Loading weather data...</div>;
    }

    return (
        <div>
            <h2>Weather in {capital}</h2>
            <p>Temperature: {weather.main.temp} °C</p>
            <p>Wind: {weather.wind.speed} m/s</p>
            <p>Weather: {weather.weather[0].description}</p>
            <img src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt="Weather icon" />
        </div>
    );
};

export default Weather;
