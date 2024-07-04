import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';

const API_TOKEN = '1186b11366600916c7c7d5632e24383a03b93045';

const Card = () => {
  const [city, setCity] = useState('barcelona'); 
  const [searchCity, setSearchCity] = useState(''); 
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async (cityName) => {
    const API_URL = `https://api.waqi.info/feed/${cityName}/?token=${API_TOKEN}`;
    setLoading(true);
    try {
      const response = await axios.get(API_URL);
      if (response.data.status === 'ok') {
        setData(response.data.data);
        setError(null);
      } else {
        setError('Location not found');
        setData(null);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      setError('Error fetching data');
      setData(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(city);
  }, [city]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchCity.trim()) {
      setCity(searchCity.trim());
    }
  };

  const capitalizeFirstLetter = (string) => {
    const words = string.split(' ');
    for (let i = 0; i < words.length; i++) {
      words[i] = words[i].charAt(0).toUpperCase() + words[i].slice(1);
    }
    return words.join(' ');
  };

  const getHealthImpact = (aqi) => {
    if (aqi <= 50) return 'Good';
    if (aqi <= 100) return 'Moderate';
    if (aqi <= 150) return 'Unhealthy for Sensitive Groups';
    if (aqi <= 200) return 'Unhealthy';
    if (aqi <= 300) return 'Very Unhealthy';
    return 'Hazardous';
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { weekday: 'short', hour: '2-digit', minute: '2-digit' };
    return date.toLocaleDateString('en-UK', options);
  };

  return (
    <div> 
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={searchCity}
          onChange={(e) => setSearchCity(e.target.value)}
          placeholder="Enter city name"
        />
        <button type="submit">Search</button>
      </form>
      {loading && <div>Loading...</div>}
      {error && <div>{error}</div>}
      {data && (
        <div>
          <h1>{capitalizeFirstLetter(city)}</h1>
          <h2>{capitalizeFirstLetter(city)} AQI: Real-time Air Quality Index (AQI)</h2>
          <div>
            <h4>AQI: {data.aqi}</h4>
            <h5>{getHealthImpact(data.aqi)}</h5>
            <p>Updated on {formatDate(data.time.s)}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Card;