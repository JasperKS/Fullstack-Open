import { useState, useEffect } from "react";
import axios from "axios";
import Persons from "./components/Persons";
import PersonForm from "./components/PersonForm";
import Filter from "./components/Filter";
import personService from "./services/persons";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [searchInfo, setSearchInfo] = useState("");
  const [filteredPeople, setFilteredPeople] = useState(persons);

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
        setFilteredPeople(initialPersons)
      })
  }, []);

  const addName = (event) => {
    event.preventDefault();
    const newPerson = {
      name: newName,
      number: newNumber,
      id: persons.length + 1,
    };

    personService
      .create(newPerson)
      .then(returnedPerson => {
        if (persons.some((person) => person.name == newName)) {
          alert(`${newName} is already added to phonebook`);
        } else {
          const newPeople = persons.concat(returnedPerson);
          setPersons(newPeople);
          setFilteredPeople(newPeople);
          setNewName("");
          setNewNumber("");
        }
        
      })

    
  };

  const filterPeople = (event) => {
    event.preventDefault();
    const filtered = persons.filter((person) =>
      person.name.toLowerCase().includes(searchInfo.toLowerCase())
    );
    setFilteredPeople(filtered);
    setSearchInfo("");
  };

  const handleNewName = (event) => {
    setNewName(event.target.value);
  };

  const handleNewNumber = (event) => {
    setNewNumber(event.target.value);
  };

  const handleFilter = (event) => {
    setSearchInfo(event.target.value);
  };

  const deletePerson = (id) => {
    console.log("delete id ", id)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter
        filterPeople={filterPeople}
        handleFilter={handleFilter}
        searchInfo={searchInfo}
      />
      <h2>add a new</h2>
      <PersonForm
        addName={addName}
        newName={newName}
        newNumber={newNumber}
        handleNewName={handleNewName}
        handleNewNumber={handleNewNumber}
      />
      <h2>Numbers</h2>
      <Persons filteredPeople={filteredPeople} deletePerson={deletePerson} />
      <div>debug: {newName}</div>
    </div>
  );
};

export default App;
