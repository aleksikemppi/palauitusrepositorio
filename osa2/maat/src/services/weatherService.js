import axios from 'axios';

const api_key = import.meta.env.VITE_OPENWEATHER_API_KEY;
const baseUrl = `https://api.openweathermap.org/data/2.5/weather?appid=${api_key}&units=metric`;

const getWeather = (city) => {
    const request = axios.get(`${baseUrl}&q=${city}`);
    return request.then(response => response.data);
}

export default { getWeather };