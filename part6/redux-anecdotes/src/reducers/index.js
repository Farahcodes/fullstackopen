import { combineReducers } from 'redux';
import anecdoteReducer from './anecdoteReducer';
import filterReducer from './filterReducer';

export default combineReducers({
  anecdotes: anecdoteReducer,
  filter: filterReducer,
});
