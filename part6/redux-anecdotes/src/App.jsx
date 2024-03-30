// @ts-nocheck
/* eslint-disable no-unused-vars */
import React, { useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  voteForAnecdote,
  createAnecdote,
} from './reducers/anecdoteReducer';

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

  // function to dispatch the create action
  const addNewAnecdote = (event) => {
    event.preventDefault();
    const content = inputRef.current.value;
    inputRef.current.value = '';
    dispatch(createAnecdote(content));
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
      <h2>create new</h2>
      <form onSubmit={addNewAnecdote}>
        <div>
          <input ref={inputRef} />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default App;
