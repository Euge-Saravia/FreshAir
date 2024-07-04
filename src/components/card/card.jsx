import axios from "axios";
import { useEffect, useState } from "react";
import styled from "styled-components";

const Container = styled.div`
  padding: 1rem;
  text-align: center;
  font-family: "Noto Serif", Cambria, "Palatino Linotype", "Book Antiqua",
    "URW Palladio L", serif;
  align-self: center;
  margin: auto 0;

  display: flex;
  flex-direction: column;
  gap: 1rem;

  h1 {
    font-size: 44px;
    color: #000000;
  }

  h2 {
    color: #1980bc;
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

  .updated {
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
    background-color: #1ecdb0;
    color: #000000;
    cursor: pointer;
    margin-left: 20px;
  }

  button:hover {
    background-color: #1ecdb0;
  }

  @media (min-width: 1024px) {
    h1 {
      font-size: 60px;
    }
    input {
      padding: 15px 30px;
      font-size: 20px;
    }
    button {
      font-size: 20px;
      padding: 15px 30px;
    }
  }
`;

const AirQualityContainer = styled.div`
  max-width: 300px;
  padding: 15px;
  border: 1px solid #000000;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);

  .city-name {
    font-size: 44px;
    color: #000000;
  }
`;

const DefaultMessageContainer = styled.p`
  font-family: "Noto Serif", Cambria, "Palatino Linotype", "Book Antiqua",
    "URW Palladio L", serif;
  font-size: 24px;
  color: #000;

  @media (min-width: 1024px) {
    font-size: 40px;
  }
`;

const Card = () => {
  const [city, setCity] = useState("");
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
    if (city) {
      fetchData(city);
    }
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
      <h1>FreshAir</h1>
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
      {data ? (
        <AirQualityContainer>
          <h2 className="city-name">{capitalizeFirstLetter(city)}</h2>
          <h2>
            {capitalizeFirstLetter(city)} AQI: Real-time Air Quality Index (AQI)
          </h2>
          <div className={`colorCard ${getAQIClass(data.aqi)}`}>
            <h4>{data.aqi}</h4>
            <h5>{getHealthImpact(data.aqi)}</h5>
          </div>
          <p className="updated">Updated on {formatDate(data.time.s)}</p>
        </AirQualityContainer>
      ) : (
        <DefaultMessageContainer>
          Descubre la calidad del aire en tu ciudad o en tu próximo destino.
          ¡Busca ahora y mantente informado!
        </DefaultMessageContainer>
      )}
    </Container>
  );
};

export default Card;
