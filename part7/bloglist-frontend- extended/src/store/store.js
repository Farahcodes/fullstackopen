import { configureStore } from '@reduxjs/toolkit';
// reducers
import rootReducer from '../reducers/index';

const store = configureStore({
  reducer: rootReducer,
});

export default store;
