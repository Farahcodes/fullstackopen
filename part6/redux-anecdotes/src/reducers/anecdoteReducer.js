/* eslint-disable no-unused-vars */
// @ts-nocheck
import { createSlice } from '@reduxjs/toolkit';
import { showNotification } from './notificationReducer';
// services
import anecdoteService from '../services/anecdotes';

const getId = () => (100000 * Math.random()).toFixed(0);

const anecdotesSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    vote(state, action) {
      const id = action.payload;
      const anecdoteToVote = state.find(
        (anecdote) => anecdote.id === id
      );
      if (anecdoteToVote) {
        anecdoteToVote.votes += 1;
      }
    },
    newAnecdote(state, action) {
      state.push(action.payload);
    },
    appendAnecdote(state, action) {
      return state.concat(action.payload);
    },
    setAnecdotes(state, action) {
      return action.payload;
    },
  },
});

export const { vote, newAnecdote, appendAnecdote, setAnecdotes } =
  anecdotesSlice.actions;

// Action creators
export const voteForAnecdote = (anecdote) => async (dispatch) => {
  try {
    const updatedAnecdote = await anecdoteService.update(
      anecdote.id,
      {
        ...anecdote,
        votes: anecdote.votes + 1,
      }
    );
    dispatch(vote(updatedAnecdote.id));
    dispatch(
      showNotification(`You voted for '${updatedAnecdote.content}'`)
    );
  } catch (error) {
    console.error(
      'An error occurred while voting for anecdote:',
      error
    );
  }
};

export const initializeAnecdotes = () => async (dispatch) => {
  const anecdotes = await anecdoteService.getAll();
  dispatch(setAnecdotes(anecdotes));
};

export const createAnecdote = (content) => async (dispatch) => {
  try {
    const newAnecdoteData = {
      content,
      votes: 0,
    };
    const newAnecdote = await anecdoteService.createNew(
      newAnecdoteData
    );
    dispatch(appendAnecdote(newAnecdote));
  } catch (error) {
    console.error(
      'An error occurred while creating anecdote:',
      error
    );
  }
};

export default anecdotesSlice.reducer;
