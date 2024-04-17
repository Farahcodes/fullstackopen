// @ts-nocheck
import { createSlice } from '@reduxjs/toolkit';

const initialState = null;

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    setNotification(state, action) {
      return {
        message: action.payload.message,
        type: action.payload.type,
      };
    },
    clearNotification() {
      return null;
    },
  },
});

export const { setNotification, clearNotification } =
  notificationSlice.actions;

// Thunk action for showing a notification with a type for 5 seconds
export const showNotification = ({ message, type = 'success' }) => {
  return async (dispatch) => {
    dispatch(setNotification({ message, type }));
    setTimeout(() => {
      dispatch(clearNotification());
    }, 5000);
  };
};

export default notificationSlice.reducer;
