// @ts-nocheck
/* eslint-disable semi */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';

// store
import { createBlog } from '../reducers/blogReducer';

const AddBlogForm = ({ toggleVisibility }) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');

  const dispatch = useDispatch();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const blogObject = {
      title,
      author,
      url,
      likes: 0,
    };

    dispatch(createBlog(blogObject));
    toggleVisibility();
    setTitle('');
    setAuthor('');
    setUrl('');
  };

  return (
    <div>
      <h2>Add New Blog</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">title:</label>
          <input
            id="title"
            type="text"
            value={title}
            name="title"
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          <label htmlFor="author">author:</label>
          <input
            id="author"
            type="text"
            value={author}
            name="author"
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          <label htmlFor="url">url:</label>
          <input
            id="url"
            type="text"
            value={url}
            name="url"
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

AddBlogForm.propTypes = {
  addBlog: PropTypes.func.isRequired,
  toggleVisibility: PropTypes.func,
};

export default AddBlogForm;
