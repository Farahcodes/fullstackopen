// @ts-nocheck
/* eslint-disable no-unused-vars */
import React, { useRef } from 'react';
import { useDispatch } from 'react-redux';
// services
import anecdoteService from '../services/anecdotes';
// reducers
import { newAnecdote } from '../reducers/anecdoteReducer';
import { showNotification } from '../reducers/notificationReducer';

const AnecdoteForm = () => {
  const dispatch = useDispatch();
  const inputRef = useRef();

  const addNewAnecdote = async (event) => {
    event.preventDefault();
    const content = inputRef.current.value;
    inputRef.current.value = '';

    const createdAnecdote = await anecdoteService.createNew({
      content,
      votes: 0,
    });
    dispatch(newAnecdote(createdAnecdote));
    dispatch(showNotification(`You created "${content}"`));
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
