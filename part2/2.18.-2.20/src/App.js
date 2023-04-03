import { useState, useEffect } from "react";
import countryService from "./services/countries";

const App = () => {
  const [countries, setCountries] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCountry, setSelectedCountry] = useState(null);

  useEffect(() => {
    countryService.getAll().then((countries) => {
      setCountries(countries);
    });
  }, []);

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
    const country = countries.find((c) => c.name.common === event.target.value);
    setSelectedCountry(country);
  };

  const renderCountryList = () => {
    if (countriesToShow.length === 0) {
      return <p>No countries found.</p>;
    } else if (countriesToShow.length > 10) {
      return <p>Too many matches, please specify another filter.</p>;
    } else if (countriesToShow.length === 1) {
      const country = countriesToShow[0];
      return (
        <div>
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
        </div>
      );
    } else {
      return (
        <ul>
          {countriesToShow.map((country) => (
            <li key={country.name.common}>
              {country.name.common}
              <button onClick={handleShowCountry} value={country.name.common}>
                show
              </button>
            </li>
          ))}
        </ul>
      );
    }
  };

  const renderCountryView = () => {
    if (selectedCountry) {
      const country = selectedCountry;
      return (
        <div>
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
        </div>
      );
    } else {
      return null;
    }
  };

  return (
    <div>
      <label>Find countries: </label>
      <input value={searchQuery} onChange={handleSearchQueryChange} />
      {renderCountryList()}
      {renderCountryView()}
    </div>
  );
};

export default App;