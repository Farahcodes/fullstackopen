import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

// components
import SearchFilter from "./components/SearchFilter";
import AddPersonForm from "./components/AddPersonForm";
import Persons from "./components/Persons";
// services
import personService from "./services/persons";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filterName, setFilterName] = useState("");

  useEffect(() => {
    personService.getAll().then((initialPersons) => {
      setPersons(initialPersons);
    });
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (isDuplicateName(newName)) {
      alert(`${newName} already exists in the phonebook.`);
      return;
    }
    const personObject = {
      id: uuidv4(),
      name: newName,
      number: newNumber,
    };
    setPersons([...persons, personObject]);
    setNewName("");
    setNewNumber("");
  };
  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleFilterChange = (event) => {
    setFilterName(event.target.value);
  };

  const isDuplicateName = (name) => {
    return persons.some(
      (person) => person.name.toLowerCase() === name.toLowerCase()
    );
  };

  const filteredPersons = persons.filter((person) =>
    person.name.toLowerCase().includes(filterName.toLowerCase())
  );

  return (
    <div>
      <h2>Phonebook</h2>
      <SearchFilter value={filterName} onChange={handleFilterChange} />
      <AddPersonForm
        onSubmit={handleSubmit}
        nameValue={newName}
        numberValue={newNumber}
        onChangeName={handleNameChange}
        onChangeNumber={handleNumberChange}
      />
      <h2>Numbers</h2>
      <Persons persons={filteredPersons} />
    </div>
  );
};

export default App;
