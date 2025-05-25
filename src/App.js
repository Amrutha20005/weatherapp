import React, { useState } from 'react';
import { getCurrentWeather, getForecast } from './weatherService';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend);

function App() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [error, setError] = useState('');

const fetchWeather = async () => {
  try {
    const data = await getCurrentWeather(city);
    setWeather(data);
    setError('');

    const forecastData = await getForecast(data.coord.lat, data.coord.lon);
    setForecast(forecastData);
  } catch (err) {
    setError('City not found or API error');
    setWeather(null);
    setForecast(null);
  }
};

const chartData = forecast ? {
  labels: forecast.list.filter((_, idx) => idx % 8 === 0).map(item =>
    new Date(item.dt_txt).toLocaleDateString()
  ),
  datasets: [{
    label: 'Temperature (°C)',
    data: forecast.list.filter((_, idx) => idx % 8 === 0).map(item => item.main.temp),
    fill: false,
    borderColor: 'rgba(75,192,192,1)',
    tension: 0.3
  }]
} : null;

  return (
    <div style={{ textAlign: 'center', padding: '40px' }}>
      <h1>Weather App</h1>
      <input
        type="text"
        placeholder="Enter city name"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        style={{ padding: '10px', fontSize: '16px' }}
      />
      <button onClick={fetchWeather} style={{ marginLeft: '10px', padding: '10px 20px' }}>
        Get Weather
      </button>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {weather && (
        <div style={{ marginTop: '20px' }}>
          {weather && (
  <div style={{ marginTop: '20px' }}>
    <h2>{weather.name}</h2>
    <p>Temperature: {weather.main.temp} °C</p>
    <img
      src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
      alt="Weather Icon"
    />
    <p>Weather: {weather.weather[0].description}</p>
    <p>Humidity: {weather.main.humidity}%</p>
  </div>
)}
{forecast && (
  <div style={{ width: '80%', margin: '40px auto' }}>
    <h3>5-Day Forecast</h3>
    <Line data={chartData} />
  </div>
)}

        </div>
      )}
    </div>
  );
}

export default App;
