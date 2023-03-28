import React from "react";
import Person from "./Person";

const Persons = ({ persons }) => {
  return (
    <ul>
      {persons.map((person) => (
        <Person key={person.id} name={person.name} number={person.number} />
      ))}
    </ul>
  );
};

export default Persons;
