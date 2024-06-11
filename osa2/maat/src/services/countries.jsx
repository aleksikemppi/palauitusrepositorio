import axios from 'axios';

const baseURL = 'https://studies.cs.helsinki.fi/restcountries/api';

const getAll = () => axios.get(`${baseURL}/all`).then(res => res.data);

const getCountry = name => axios.get(`${baseURL}/name/${name}`).then(res => res.data);

export default { getAll, getCountry };
