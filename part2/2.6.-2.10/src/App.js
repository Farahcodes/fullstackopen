import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

// components
import Person from "./components/Person";
import SearchFilter from "./components/SearchFilter";
import AddPersonForm from "./components/AddPersonForm";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456", id: 1 },
    { name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
    { name: "Dan Abramov", number: "12-43-234345", id: 3 },
    { name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filterName, setFilterName] = useState("");

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
      <ul>
        {filteredPersons.map((person) => (
          <Person key={person.id} name={person.name} number={person.number} />
        ))}
      </ul>
    </div>
  );
};

export default App;
