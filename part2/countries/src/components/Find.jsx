const Find = ({ searchCountry, handleFindCountry, findCountry }) => {
    console.log(`finding country: ${searchCountry}`);
    return (
        <>
            <form onSubmit={findCountry}>
                <div>
                    find countries <input value={searchCountry} onChange={handleFindCountry}/>
                </div>
            </form>
        </>
    )
}

export default Find