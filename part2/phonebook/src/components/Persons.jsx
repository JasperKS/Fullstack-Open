const Person = ({ person }) => {
    return (
        <li>{person.name} {person.number}</li>
    )
}

const Persons = ({ filteredPeople }) => {
    return (
        <>
            <ul>
            {filteredPeople.map((person) => (
            <Person key={person.id} person={person} />
            ))}
            </ul>
        </>
    )
}



export default Persons