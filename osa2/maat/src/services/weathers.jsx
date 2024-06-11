import axios from "axios";

const getCapital = (country) => {
    const apiURL = "https://api.openweathermap.org/data/2.5";
    const apiKey = import.meta.env.VITE_WEATHER_KEY;

    console.log('getCapital: ', country);
    const [latitude, longtitude] = country.capitalInfo.latlng
    console.log(latitude);
    console.log(longtitude);
    console.log(`${apiURL}/weather?lat=${latitude}&lon=${longtitude}&appid=${apiKey}`);

    return (
        axios
        .get(`${apiURL}/weather?lat=${latitude}&lon=${longtitude}&appid=${apiKey}`)
        .then(res => res.data)
    )
}

export default {getCapital}