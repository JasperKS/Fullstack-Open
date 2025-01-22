import { useState, useEffect } from "react";
import axios from "axios";
import Persons from "./components/Persons";
import PersonForm from "./components/PersonForm";
import Filter from "./components/Filter";
import personService from "./services/persons";
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [searchInfo, setSearchInfo] = useState("");
  const [filteredPeople, setFilteredPeople] = useState(persons);
  const [notif, setNotif] = useState(null);
  const [success, setSuccess] = useState(true);

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
    };

    if (persons.some((person) => person.name == newName)) {
      if(window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)){
        const existing = persons.find(person => person.name === newName)
        const id = existing.id;

        personService
          .update(id, newPerson)
          .then(returnedPerson => {
            setPersons(persons.map(person => person.id === id ? returnedPerson : person))
            setFilteredPeople(filteredPeople.map(person => person.id === id ? returnedPerson : person))
            setSuccess(true);
            setNotif(`Updated ${returnedPerson.name}'s number`)
            setTimeout(() => {
              setNotif(null)
            }, 5000)
          })
          .catch(error => {
            setSuccess(false);
            setNotif(`Information of ${newName} has already been removed from the server`)
            setTimeout(() => {
              setNotif(null)
            }, 5000)
            setPersons(persons.filter(person => person.id !== id))
            setFilteredPeople(filteredPeople.filter(person => person.id !== id))
          })

      }
    } else {
      personService
      .create(newPerson)
      .then(returnedPerson => {
        const newPeople = persons.concat(returnedPerson);
        setPersons(newPeople);
        setFilteredPeople(newPeople);
        setSuccess(true);
        setNotif(`Added ${returnedPerson.name}`)
        setTimeout(() => {
          setNotif(null)
        }, 5000)
      })
    }
  setNewName("");
  setNewNumber("");  
  };

  const deletePerson = (id) => {
    const person = persons.find(person => person.id === id)

    if (window.confirm(`Do you really want to delete ${person.name}?`)){
      personService
      .del(id)
      .then(() => { 
        setPersons(persons.filter(p => person.id != p.id))
        setFilteredPeople(filteredPeople.filter(p => person.id != p.id))
        setNotif(`Deleted ${person.name}'s number`)
            setTimeout(() => {
              setNotif(null)
            }, 5000)
      })
    }
  }

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
      <Notification message={notif} success={success}/>
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
