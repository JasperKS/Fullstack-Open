import { useState, useEffect } from 'react';
import Find from './components/Find';
import countryService from "./services/countries";
import Countries from './components/Countries';

function App() {
  const [countries, setCountries] = useState([]);
  const [searchCountry, setSearchCountry] = useState("");
  const [filteredCountries, setFilteredCountries] = useState([]);

  useEffect(() => {
    countryService
      .getAll()
      .then(initialCountries => {
        setCountries(initialCountries)
      })
  }, [])

  const findCountry = (event) => {
    event.preventDefault();
    const filtered = countries.filter(country => 
      country.name.common.toLowerCase().includes(searchCountry.toLowerCase()))
    setFilteredCountries(filtered)
    
  }

  const toggleShowOf = (id) => {
    const filtered = filteredCountries.filter(country => country.name.official === id);
    setFilteredCountries(filtered);

  }

  
  const handleFindCountry = (event) => {
    setSearchCountry(event.target.value);
  }

  return (
    <>
      <Find
        searchCountry={searchCountry}
        handleFindCountry={handleFindCountry}
        findCountry={findCountry}
      />
      <Countries filteredCountries={filteredCountries} toggleShowOf={toggleShowOf}/>
    </>
  )
}

export default App
