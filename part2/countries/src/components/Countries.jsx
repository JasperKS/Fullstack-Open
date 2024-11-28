import weatherService from '../services/weather.js';
import { useState } from 'react';

const Country = ({ country, toggleShow }) => {
    return (
        <div>
            {country.name.common} {' '}
            <button onClick={toggleShow}>show</button>
        </div>
    )
}

const Language = ({ language }) => {
    return (
        <li>
            {language}
        </li>
    )
}


const Countries = ({ filteredCountries, toggleShowOf }) => {
    const [capitalWeather, setCapitalWeather] = useState(null);
    if (filteredCountries.length > 10) {
        return (
            <>Too many matches</>
        )
    } else if (filteredCountries.length === 1) {
        const country = filteredCountries[0];
        const lat = country.capitalInfo.latlng[0];
        const lon = country.capitalInfo.latlng[1];

        weatherService
            .getWeather(lat, lon)
            .then(weatherInfo => { 
                setCapitalWeather(weatherInfo)
            })

        return (
            <>
            <h2>{country.name.common}</h2>
            <div>capital {country.capital}</div>
            <div>area {country.area}</div>
            <div>
                <h4>languages:</h4>
                <ul>
                    {Object.values(country.languages).map((lang, i) =>
                    <Language key={i} language={lang}/>)}
                </ul>
            </div>
            <div><img src={country.flags.png} alt={country.flags.alt}></img></div>
            <h3>Weather in {country.capital}</h3>
            </>
        )
    } else {
        return (
            <>
                {filteredCountries.map(country => 
                    <Country key={country.name.official} country={country} toggleShow={() => toggleShowOf(country.name.official)}/>
                )}
            </>
        )
    }
    
}

export default Countries