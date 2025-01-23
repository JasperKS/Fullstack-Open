const Person = ({ person, deletePerson }) => {
    return (
        <li>
            {person.name} {person.number} <button onClick={deletePerson}>delete</button>
        </li>
    )
}

const Persons = ({ people, deletePerson }) => {
    return (
        <>
            <ul>
            {people.map((person) => (
            <Person key={person.id} person={person} deletePerson={() => deletePerson(person.id)} />
            ))}
            </ul>
        </>
    )
}



export default Persons