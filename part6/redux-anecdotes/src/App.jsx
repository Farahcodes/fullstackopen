// @ts-nocheck
/* eslint-disable no-unused-vars */
import React, { useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { voteForAnecdote } from './reducers/anecdoteReducer';
// components/AnecdoteForm.js
import AnecdoteForm from './components/AnecdoteForm';

const App = () => {
  const anecdotes = useSelector((state) =>
    state.sort((a, b) => b.votes - a.votes)
  );
  const dispatch = useDispatch();
  const inputRef = useRef();

  // function to dispatch the vote action
  const vote = (id) => {
    dispatch(voteForAnecdote(id));
  };

  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      ))}
      <AnecdoteForm />
    </div>
  );
};

export default App;
