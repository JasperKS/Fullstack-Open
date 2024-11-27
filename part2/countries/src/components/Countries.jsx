const Country = ({ country }) => {
    return (
        <li>
            {country.name.common}
        </li>
    )
}

const Language = ({ language }) => {
    return (
        <li>
            {language}
        </li>
    )
}


const Countries = ({ filteredCountries }) => {
    if (filteredCountries.length > 10) {
        return (
            <>Too many matches</>
        )
    } else if (filteredCountries.length === 1) {
        const country = filteredCountries[0];
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
            <img src={country.flags.png} alt={country.flags.alt}></img>
            </>
        )
    } else {
        return (
            <>
                <ul>
                    {filteredCountries.map(country => 
                        <Country key={country.name.official} country={country}/>
                    )}
                </ul>
            </>
        )
    }
    
}

export default Countries