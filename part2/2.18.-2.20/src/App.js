import { useState, useEffect } from "react";
import countryService from "./services/countries";
import axios from "axios";

const App = () => {
  const [countries, setCountries] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    countryService.getAll().then((countries) => {
      setCountries(countries);
    });
  }, []);

  useEffect(() => {
    if (selectedCountry) {
      const capital = selectedCountry.capital[0];
      const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${capital}&appid=${process.env.REACT_APP_WEATHER_API_KEY}&units=metric`;
      axios.get(weatherUrl).then((response) => {
        setWeather(response.data);
      });
    }
  }, [selectedCountry]);

  const handleSearchQueryChange = (event) => {
    setSearchQuery(event.target.value);
    setSelectedCountry(null);
  };

  const countriesToShow =
    searchQuery === ""
      ? []
      : countries.filter((country) =>
          country.name.common.toLowerCase().includes(searchQuery.toLowerCase())
        );

  const handleShowCountry = (event) => {
    const countryName = event.target.value;
    const country = countries.find((c) => c.name.common === countryName);
    setSelectedCountry(country);
  };

  const renderCountryList = () => {
    if (selectedCountry) {
      const country = selectedCountry;
      return (
        <div className="container">
          <h2>{country.name.common}</h2>
          <p>Capital: {country.capital}</p>
          <p>Area: {country.area} km²</p>
          <h3>Languages</h3>
          <ul>
            {Object.values(country.languages).map((language) => (
              <li key={language}>{language}</li>
            ))}
          </ul>
          <img src={country.flags.png} alt={country.name.common} width="200" />
          {weather && (
            <div className="weather">
              <h3>Weather in {selectedCountry.capital}</h3>
              <p>Temperature: {weather.main.temp}°C</p>
              <img
                src={`https://openweathermap.org/img/w/${weather.weather[0].icon}.png`}
                alt={weather.weather[0].description}
              />
              <p>{weather.weather[0].description}</p>
              <p>Wind: {weather.wind.speed} m/s</p>
            </div>
          )}
        </div>
      );
    } else if (countriesToShow.length === 0) {
      return <p className="message">No countries found.</p>;
    } else if (countriesToShow.length > 10) {
      return (
        <p className="message">
          Too many matches, please specify another filter.
        </p>
      );
    } else if (countriesToShow.length === 1) {
      const country = countriesToShow[0];
      return (
        <div className="container">
          <h2>{country.name.common}</h2>
          <p>Capital: {country.capital}</p>
          <p>Area: {country.area} km²</p>
          <h3>Languages</h3>
          <ul>
            {Object.values(country.languages).map((language) => (
              <li key={language}>{language}</li>
            ))}
          </ul>
          <img src={country.flags.png} alt={country.name.common} width="200" />
          {weather && (
            <div className="weather">
              <h3>Weather in {selectedCountry.capital[0]}</h3>
              <p>Temperature: {weather.main.temp}°C</p>
              <img
                src={`https://openweathermap.org/img/w/${weather.weather[0].icon}.png`}
                alt={weather.weather[0].description}
              />
              <p>{weather.weather[0].description}</p>
              <p>Wind: {weather.wind.speed} m/s</p>
            </div>
          )}
        </div>
      );
    } else {
      return (
        <ul className="country-list">
          {countriesToShow.map((country) => (
            <li key={country.name.common}>
              {country.name.common}
              <button
                className="show-button"
                onClick={handleShowCountry}
                value={country.name.common}
              >
                show
              </button>
            </li>
          ))}
        </ul>
      );
    }
  };

  return (
    <div>
      <label>Find countries: </label>
      <input value={searchQuery} onChange={handleSearchQueryChange} />
      {renderCountryList()}
    </div>
  );
};

export default App;
