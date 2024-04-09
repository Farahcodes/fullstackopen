/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react';

const AnecdoteList = ({ anecdotes }) => (
  <div>
    <h2>Anecdotes</h2>
    <ul>
      {anecdotes.map((anecdote) => (
        <li key={anecdote.id}>{anecdote.content}</li>
      ))}
    </ul>
  </div>
);

export default AnecdoteList;
