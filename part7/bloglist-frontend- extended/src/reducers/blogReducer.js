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

export const likeBlog = (blog) => async (dispatch) => {
  try {
    const updatedBlog = await blogService.update(blog.id, {
      ...blog,
      likes: blog.likes + 1,
    });
    dispatch(updateBlogInState(updatedBlog));
    dispatch(
      showNotification({
        message: `Liked "${updatedBlog.title}"!`,
        type: 'success',
      })
    );
  } catch (error) {
    console.error('Failed to like blog:', error);
    dispatch(
      showNotification({
        message: 'Failed to like blog.',
        type: 'failure',
      })
    );
  }
};

export const deleteBlog = (id) => async (dispatch) => {
  try {
    await blogService.remove(id);
    dispatch(removeBlogFromState(id));
    dispatch(
      showNotification({
        message: 'Blog deleted successfully!',
        type: 'success',
      })
    );
  } catch (error) {
    console.error('Failed to delete blog:', error);
    dispatch(
      showNotification({
        message: 'Failed to delete blog.',
        type: 'failure',
      })
    );
  }
};

export const addComment = (id, comment) => async (dispatch) => {
  try {
    const updatedBlog = await blogService.addComment(id, comment);
    dispatch(updateBlogInState(updatedBlog));
    dispatch(
      showNotification({
        message: 'Comment added successfully!',
        type: 'success',
      })
    );
  } catch (error) {
    console.error('Failed to add comment:', error);
    dispatch(
      showNotification({
        message: 'Failed to add comment.',
        type: 'failure',
      })
    );
  }
};

export default blogSlice.reducer;
