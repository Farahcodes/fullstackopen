// @ts-nocheck
/* eslint-disable no-unused-vars */
import React, { useRef } from 'react';
import { useDispatch } from 'react-redux';
import { createAnecdote } from '../reducers/anecdoteReducer';

const AnecdoteForm = () => {
  const dispatch = useDispatch();
  const inputRef = useRef();

  const addNewAnecdote = (event) => {
    event.preventDefault();
    const content = inputRef.current.value;
    dispatch(createAnecdote(content));
    inputRef.current.value = '';
  };

  return (
    <div>
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

export default AnecdoteForm;
