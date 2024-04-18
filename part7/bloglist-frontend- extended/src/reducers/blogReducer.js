// @ts-nocheck
// blogSlice.js
import { createSlice } from '@reduxjs/toolkit';

// services
import blogService from '../services/blogs';
// store
import { showNotification } from './notificationReducer';

const blogSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    appendBlog(state, action) {
      state.push(action.payload);
    },
    setBlogs(state, action) {
      return action.payload;
    },
    updateBlogInState(state, action) {
      const updatedBlog = action.payload;
      return state.map((blog) =>
        blog.id === updatedBlog.id ? updatedBlog : blog
      );
    },
    removeBlogFromState(state, action) {
      const id = action.payload;
      return state.filter((blog) => blog.id !== id);
    },
  },
});

export const {
  appendBlog,
  setBlogs,
  updateBlogInState,
  removeBlogFromState,
} = blogSlice.actions;

export const fetchBlogs = () => async (dispatch) => {
  try {
    const blogs = await blogService.getAll();
    dispatch(setBlogs(blogs));
  } catch (error) {
    console.error('Failed to fetch blogs:', error);
    dispatch(
      showNotification({
        message: 'Failed to load blogs.',
        type: 'failure',
      })
    );
  }
};

export const createBlog = (blogData) => async (dispatch) => {
  try {
    const newBlog = await blogService.create(blogData);
    dispatch(appendBlog(newBlog));
    dispatch(
      showNotification({
        message: `Blog "${newBlog.title}" created!`,
        type: 'success',
      })
    );
  } catch (error) {
    console.error('Failed to create blog:', error);
    dispatch(
      showNotification({
        message: 'Failed to create blog.',
        type: 'failure',
      })
    );
  }
};

export default blogSlice.reducer;
