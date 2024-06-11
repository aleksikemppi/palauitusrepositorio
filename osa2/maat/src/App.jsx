import { useState, useEffect } from 'react';
import countryService from './services/countries';
import CountryDetail from './components/Country';
import CountryList from './components/ShowCountry';

function App() {
  const [allCountries, setAllCountries] = useState([]);
  const [query, setQuery] = useState('');
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [filteredCountries, setFilteredCountries] = useState([]);

  useEffect(() => {
    countryService
      .getAll()
      .then(response => {
        setAllCountries(response);
      });
  }, []);

  useEffect(() => {
    if (filteredCountries.length === 1) {
      const countryName = filteredCountries[0].name.common.toLowerCase();
      countryService
        .getCountry(countryName)
        .then(response => {
          setSelectedCountry(response);
        });
    } else {
      setSelectedCountry(null);
    }
  }, [filteredCountries]);

  const handleQueryChange = (event) => {
    const searchTerm = event.target.value;
    setQuery(searchTerm);
    const matchingCountries = allCountries.filter(country => {
      const commonName = country.name.common.toLowerCase();
      const officialName = country.name.official.toLowerCase();
      return (
        commonName.includes(searchTerm.toLowerCase()) ||
        officialName.includes(searchTerm.toLowerCase())
      );
    });
    setFilteredCountries(matchingCountries);
  };

  const handleShowCountry = (country) => {
    console.log([country]);
    setQuery(country.name.common);
    setFilteredCountries([country]);
  };

  return (
    <div>
      {allCountries.length === 0 ? (
        <p>Loading countries...</p>
      ) : (
        <div>
          <div>
            find countries <input value={query} onChange={handleQueryChange} />
          </div>
          {selectedCountry ? (
            <CountryDetail country={selectedCountry} />
          ) : (
            <CountryList matches={filteredCountries} search={query} handleShow={handleShowCountry} />
          )}
        </div>
      )}
    </div>
  );
}

export default App;
