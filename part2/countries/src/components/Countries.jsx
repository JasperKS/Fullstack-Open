const Country = ({ country }) => {
    return (
        <li>
            {country.name.common}
        </li>
    )
}

const Countries = ({ filteredCountries }) => {
    if (filteredCountries.length > 10) {
        return (
            <>Too many matches</>
        )
    } else if (filteredCountries.length === 1) {
        return (
            <>Okay lang</>
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