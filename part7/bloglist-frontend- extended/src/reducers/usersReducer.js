// @ts-nocheck
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import usersService from '../services/users';

// Create an async thunk for fetching users
export const fetchUsers = createAsyncThunk(
  'users/fetchUsers',
  async (_, { rejectWithValue }) => {
    try {
      const users = await usersService.getAll();
      return users;
    } catch (error) {
      return rejectWithValue(error.response.data); // Return the rejected value
    }
  }
);

const usersSlice = createSlice({
  name: 'users',
  initialState: {
    data: [],
    status: 'idle', // 'idle', 'loading', 'succeeded', 'failed'
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export default usersSlice.reducer;
