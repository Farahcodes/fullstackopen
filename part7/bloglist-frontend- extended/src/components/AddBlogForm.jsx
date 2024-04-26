// @ts-nocheck
/* eslint-disable semi */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
// MUI components
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

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
    <Container>
      <Typography variant="h2">Add New Blog</Typography>
      <Box component="form" onSubmit={handleSubmit}>
        <TextField
          id="title"
          label="Title"
          value={title}
          onChange={({ target }) => setTitle(target.value)}
        />
        <TextField
          id="author"
          label="Author"
          value={author}
          onChange={({ target }) => setAuthor(target.value)}
        />
        <TextField
          id="url"
          label="URL"
          value={url}
          onChange={({ target }) => setUrl(target.value)}
        />
        <Button type="submit" variant="contained" color="primary">
          Submit
        </Button>
      </Box>
    </Container>
  );
};

export default AddBlogForm;
