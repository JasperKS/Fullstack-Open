const Filter = ({ filterPeople, searchInfo, handleFilter }) => {
    return (
        <>
            <form onSubmit={filterPeople}>
                <div>
                    filter shown with
                    <input value={searchInfo} onChange={handleFilter} />
                </div>
            </form>
        </>
    )
}
    

export default Filter