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
  const [notif, setNotif] = useState(null);
  const [success, setSuccess] = useState(true);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
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
          })

      }
    } else {
      personService
      .create(newPerson)
      .then(returnedPerson => {
        const newPeople = persons.concat(returnedPerson);
        setPersons(newPeople);
        setSuccess(true);
        setNotif(`Added ${returnedPerson.name}`)
        setTimeout(() => {
          setNotif(null)
        }, 5000)
      })
      .catch(error => {
        setSuccess(false);
        setNotif(error.response.data.error)
        setTimeout(() => {
          setNotif(null)
        }, 5000)
        console.log(error.response.data.error)
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
        setNotif(`Deleted ${person.name}'s number`)
            setTimeout(() => {
              setNotif(null)
            }, 5000)
      })
    }
  }

  const filterField = 
    p => p.name.toLowerCase().includes(filter.toLowerCase())
  
  const personsToShow = filter ? persons.filter(filterField) : persons

  const handleNewNumber = (event) => {
    setNewNumber(event.target.value);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notif} success={success}/>
      <Filter filter={filter} setFilter={setFilter}/>
      <h2>add a new</h2>
      <PersonForm
        addName={addName}
        newName={newName}
        newNumber={newNumber}
        setNewName={setNewName}
        handleNewNumber={handleNewNumber}
      />
      <h2>Numbers</h2>
      <Persons people={personsToShow} deletePerson={deletePerson} />
      <div>debug: {newName}</div>
    </div>
  );
};

export default App;
