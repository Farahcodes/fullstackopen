import React from "react";

const Person = ({ person, onDeletePerson }) => {
  const handleDeleteClick = () => {
    onDeletePerson(person.id);
  };
  return (
    <li>
      <span>
        {person.name} {person.number}
        <button onClick={handleDeleteClick}>delete</button>
      </span>
    </li>
  );
};

export default Person;
