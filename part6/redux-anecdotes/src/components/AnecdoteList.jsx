// @ts-nocheck
/* eslint-disable no-unused-vars */
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { voteForAnecdote } from '../reducers/anecdoteReducer';

const AnecdoteList = () => {
  const dispatch = useDispatch();

  const anecdotes = useSelector(({ anecdotes, filter }) => {
    return anecdotes
      .filter((anecdote) =>
        anecdote?.content
          ?.toLowerCase()
          .includes(filter.toLowerCase())
      )
      .sort((a, b) => b.votes - a.votes);
  });

  const voteHandler = (id) => {
    const anecdote = anecdotes.find((a) => a.id === id);
    dispatch(voteForAnecdote(anecdote));
  };

  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => voteHandler(anecdote.id)}>
              vote
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AnecdoteList;
