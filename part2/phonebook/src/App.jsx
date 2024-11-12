import { useState, useEffect } from "react";
import axios from "axios";
import Persons from "./components/Persons";
import PersonForm from "./components/PersonForm";
import Filter from "./components/Filter";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [searchInfo, setSearchInfo] = useState("");
  const [filteredPeople, setFilteredPeople] = useState(persons);

  useEffect(() => {
    axios.get("http://localhost:3001/persons").then((response) => {
      setPersons(response.data);
      setFilteredPeople(response.data);
    });
  }, []);

  const addName = (event) => {
    event.preventDefault();
    const newPerson = {
      name: newName,
      number: newNumber,
      id: persons.length + 1,
    };

    if (persons.some((person) => person.name == newName)) {
      alert(`${newName} is already added to phonebook`);
    } else {
      setPersons(persons.concat(newPerson));
      setNewName("");
      setNewNumber("");
    }
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
      <Persons filteredPeople={filteredPeople} />
      <div>debug: {newName}</div>
    </div>
  );
};

export default App;
