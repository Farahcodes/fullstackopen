import React from "react";

const Person = (props) => {
  return (
    <li>
      <span>
        {props.name} {props.number}
      </span>
    </li>
  );
};

export default Person;
