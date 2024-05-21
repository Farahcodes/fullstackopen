// @ts-nocheck
/* eslint-disable no-unused-vars */
import React from "react";
import { useState } from "react";
import { useQuery, useMutation, gql } from "@apollo/client";
import Select from "react-select";

// queries
import { ALL_AUTHORS, EDIT_AUTHOR } from "../queries";

/* eslint-disable react/prop-types */
const Authors = ({ show }) => {
  const { loading, error, data } = useQuery(ALL_AUTHORS);
  const [selectedAuthor, setSelectedAuthor] = useState(null);

  const [name, setName] = useState("");
  const [born, setBorn] = useState("");

  const [editAuthor] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }],
  });

  if (!show) {
    return null;
  }

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const submit = async (event) => {
    event.preventDefault();

    if (selectedAuthor) {
      await editAuthor({
        variables: {
          name: selectedAuthor.value,
          setBornTo: parseInt(born),
        },
      });

      setSelectedAuthor(null);
      setBorn("");
    }
  };

  const authorOptions = data.allAuthors.map((author) => ({
    value: author.name,
    label: author.name,
  }));

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {data.allAuthors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h3>Set birthyear</h3>
      <form onSubmit={submit}>
        <div>
          name
          <Select
            value={selectedAuthor}
            onChange={setSelectedAuthor}
            options={authorOptions}
          />
        </div>
        <div>
          born
          <input
            type="number"
            value={born}
            onChange={({ target }) => setBorn(target.value)}
          />
        </div>
        <button type="submit">update author</button>
      </form>
    </div>
  );
};

export default Authors;
