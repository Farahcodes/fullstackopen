/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react';
import { useParams } from 'react-router-dom';

const SingleAnecdote = ({ anecdotes }) => {
  const { id } = useParams();
  const anecdote = anecdotes.find((a) => a.id === Number(id));

  if (!anecdote) {
    return <p>Anecdote not found.</p>;
  }

  return (
    <div>
      <h2>
        {anecdote.content} by {anecdote.author}
      </h2>
      <p>has {anecdote.votes} votes</p>
      <p>
        for more info see{' '}
        <a
          href={anecdote.info}
          target="_blank"
          rel="noopener noreferrer"
        >
          {anecdote.info}
        </a>
      </p>
    </div>
  );
};

export default SingleAnecdote;
