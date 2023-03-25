import { useState } from "react";

// components
import Person from "./components/Person";

const App = () => {
  const [persons, setPersons] = useState([{ name: "Arto Hellas" }]);
  const [newName, setNewName] = useState("");

  const addPerson = (event) => {
    event.preventDefault();
    if (isDuplicateName(newName)) {
      alert(`${newName} already exists in the phonebook.`);
      return;
    }
    const personObject = {
      id: persons.length + 1,
      name: newName,
    };
    setPersons([...persons, personObject]);
    setNewName("");
  };
  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const isDuplicateName = (name) => {
    return persons.some(
      (person) => person.name.toLowerCase() === name.toLowerCase()
    );
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {persons.map((person) => (
          <Person key={person.name} name={person.name} />
        ))}
      </ul>
      <div>debug: {newName}</div>
    </div>
  );
};

export default App;
