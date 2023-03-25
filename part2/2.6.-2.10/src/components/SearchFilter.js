import React from "react";

const SearchFilter = (props) => {
  return (
    <div>
      filter shown with:
      <input {...props.value} {...props.onChange} />
    </div>
  );
};

export default SearchFilter;
