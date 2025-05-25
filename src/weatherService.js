import axios from 'axios';

const API_KEY = 'f3468f2fcf4c28db26028959b9ed3f4a'; 

export const getCurrentWeather = async (city) => {
  const url = `https://api.openweathermap.org/data/2.5/weather`;
  const response = await axios.get(url, {
    params: {
      q: city,
      appid: API_KEY,
      units: 'metric'
    }
  });
  return response.data;
};

export const getForecast = async (lat, lon) => {
  const response = await axios.get(
    `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`
  );
  return response.data;
};
