import React, { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";

const Container = styled.div`
  width: 300px;
  padding: 15px;
  border: 1px solid #000000;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  text-align: center;
  font-family: "Noto Serif", Cambria, "Palatino Linotype", "Book Antiqua",
    "URW Palladio L", serif;

  h1 {
    font-size: 44px;
    color: #000000
  }

  h2 {
    color: #1980BC;
    font-size: 12px;
  }

  .Good {
    background-color: #009966;
  }

  .Moderate {
    background-color: #ffde33;
  }

  .UnhealthySG {
    background-color: #ff9933;
  }

  .Unhealthy {
    background-color: #cc0033;
  }

  .VeryUnhealthy {
    background-color: #660099;
  }

  .Hazardous {
    background-color: #7e0023;
  }

  .colorCard {
    border-radius: 3px;
  }

  h4 {
    color: #000000;
    font-size: 38px;
    padding-top: 30px;
  }

  h5 {
    color: #000000;
    font-size: 36px;
    padding-bottom: 30px;
  }

  p {
    font-size: 12px;
    color: #000000;
    margin-bottom: 5px;
    margin-top: -40px;
  }

  input {
    font-size: 14px;
    border: 1px solid #000000;
  }

  button {
    padding: 5px 10px;
    font-size: 14px;
    border: none;
    border-radius: 3px;
    background-color: #1ECDB0;
    color: #000000;
    cursor: pointer;
    margin-left: 20px
  }

  button:hover {
    background-color: #1ECDB0;
  }

`;

const Card = () => {
  const [city, setCity] = useState("barcelona");
  const [searchCity, setSearchCity] = useState("");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async (cityName) => {
    const API_URL = `http://localhost:8000/feed/${cityName}`;
    setLoading(true);
    try {
      const response = await axios.get(API_URL);
      if (response.data.status === "ok") {
        setData(response.data.data);
        setError(null);
      } else {
        setError("Location not found");
        setData(null);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setError("Error fetching data");
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
    const words = string.split(" ");
    for (let i = 0; i < words.length; i++) {
      words[i] = words[i].charAt(0).toUpperCase() + words[i].slice(1);
    }
    return words.join(" ");
  };

  const getHealthImpact = (aqi) => {
    if (aqi <= 50) return "Good";
    if (aqi <= 100) return "Moderate";
    if (aqi <= 150) return "Unhealthy for Sensitive Groups";
    if (aqi <= 200) return "Unhealthy";
    if (aqi <= 300) return "Very Unhealthy";
    return "Hazardous";
  };

  const getAQIClass = (aqi) => {
    if (aqi <= 50) return "Good";
    if (aqi <= 100) return "Moderate";
    if (aqi <= 150) return "Unhealthy for Sensitive Groups";
    if (aqi <= 200) return "Unhealthy";
    if (aqi <= 300) return "Very Unhealthy";
    return "Hazardous";
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { weekday: "short", hour: "2-digit", minute: "2-digit" };
    return date.toLocaleDateString("en-UK", options);
  };

  return (
    <Container>
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
          <h2>
            {capitalizeFirstLetter(city)} AQI: Real-time Air Quality Index (AQI)
          </h2>
          <div className={`colorCard ${getAQIClass(data.aqi)}`}>
            <h4>{data.aqi}</h4>
            <h5>{getHealthImpact(data.aqi)}</h5>
          </div>
          <p>Updated on {formatDate(data.time.s)}</p>
        </div>
      )}
    </Container>
  );
};

export default Card;
