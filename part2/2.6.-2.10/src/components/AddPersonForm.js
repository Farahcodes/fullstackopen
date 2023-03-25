import React from "react";

const AddPersonForm = ({
  onSubmit,
  nameValue,
  numberValue,
  onChangeName,
  onChangeNumber,
}) => {
  return (
    <form onSubmit={onSubmit}>
      <h1>add a new</h1>
      <div>
        name: <input value={nameValue} onChange={onChangeName} />
      </div>
      <div>
        number: <input value={numberValue} onChange={onChangeNumber} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

export default AddPersonForm;
