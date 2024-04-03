/* eslint-disable no-unused-vars */
// @ts-nocheck
import { createSlice } from '@reduxjs/toolkit';
import { showNotification } from './notificationReducer';

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
export const voteForAnecdote = (id, content) => (dispatch) => {
  dispatch(vote(id));
  dispatch(showNotification(`You voted for "${content}"`));
};

export default anecdotesSlice.reducer;
