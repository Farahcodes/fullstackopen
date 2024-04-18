// userSlice.js
import { createSlice } from '@reduxjs/toolkit';

// services
import loginService from '../services/login';
// actions
import { showNotification } from './notificationReducer';

const initialState = null;

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action) {
      return action.payload;
    },
    clearUser() {
      return null;
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;

export const login = (credentials) => async (dispatch) => {
  try {
    const user = await loginService.login(credentials);
    window.localStorage.setItem(
      'loggedBlogAppUser',
      JSON.stringify(user)
    );
    dispatch(setUser(user));
    dispatch(
      showNotification({
        message: 'Login successful',
        type: 'success',
      })
    );
  } catch (error) {
    dispatch(
      showNotification({
        message: 'Failed to log in',
        type: 'failure',
      })
    );
    console.error('Login failed:', error);
  }
};

export const logout = () => (dispatch) => {
  window.localStorage.removeItem('loggedBlogAppUser');
  dispatch(clearUser());
  dispatch(
    showNotification({
      message: 'Logged out successfully',
      type: 'success',
    })
  );
};

export default userSlice.reducer;
