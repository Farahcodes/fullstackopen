/* eslint-disable no-unused-vars */
// @ts-nocheck
import { createSlice } from '@reduxjs/toolkit';

// Initial anecdotes
const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time... The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
];

const getId = () => (100000 * Math.random()).toFixed(0);

const asObject = (anecdote) => ({
  content: anecdote,
  id: getId(),
  votes: 0,
});

const initialState = anecdotesAtStart.map(asObject);

const anecdotesSlice = createSlice({
  name: 'anecdotes',
  initialState,
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
  },
});

export const { vote, newAnecdote } = anecdotesSlice.actions;

// Action creators
export const voteForAnecdote = (id) => (dispatch) => {
  dispatch(vote(id));
};

export const createAnecdote = (content) => (dispatch) => {
  dispatch(
    newAnecdote({
      content,
      id: getId(),
      votes: 0,
    })
  );
};

export default anecdotesSlice.reducer;
