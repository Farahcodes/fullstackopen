/* eslint-disable no-unused-vars */
// @ts-nocheck
import ReactDOM from 'react-dom/client';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';

// components
import App from './App';
// reducers
import rootReducer from './reducers/index';
import { setAnecdotes } from './reducers/anecdoteReducer';
// services
import anecdoteService from './services/anecdotes';

const store = configureStore({
  reducer: rootReducer,
});

anecdoteService.getAll().then((anecdotes) => {
  store.dispatch(setAnecdotes(anecdotes));
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>
);
