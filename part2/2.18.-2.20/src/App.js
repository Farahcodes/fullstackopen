import { useState, useEffect } from "react";
import countryService from "./services/countries";

const App = () => {
  const [countries, setCountries] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    countryService.getAll().then((countries) => {
      setCountries(countries);
    });
  }, []);

  const handleSearchQueryChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const countriesToShow =
    searchQuery === ""
      ? []
      : countries.filter((country) =>
          country.name.common.toLowerCase().includes(searchQuery.toLowerCase())
        );

  return (
    <div>
      <h2>Countries</h2>
    </div>
  );
};

export default App;
