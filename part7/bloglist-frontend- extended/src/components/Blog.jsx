// @ts-nocheck
/* eslint-disable semi */

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Collapse from '@mui/material/Collapse';

import { likeBlog, deleteBlog } from '../reducers/blogReducer';

const Blog = ({ blog, user }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const dispatch = useDispatch();

  const ownedByUser = user && user.username === blog.user.username;

  const toggleExpansion = () => {
    setIsExpanded(!isExpanded);
  };

  const handleLike = () => {
    dispatch(likeBlog(blog));
  };

  const handleDelete = () => {
    if (
      window.confirm(`Remove blog '${blog.title}' by ${blog.author}`)
    ) {
      dispatch(deleteBlog(blog.id));
    }
  };

  const details = () => (
    <>
      <Typography>{blog.url}</Typography>
      <Typography>
        Likes: {blog.likes}
        <Button onClick={handleLike}>like</Button>
      </Typography>
      {ownedByUser && <Button onClick={handleDelete}>Remove</Button>}
    </>
  );

  return (
    <Card variant="outlined">
      <CardContent>
        <Typography variant="h5" component="div">
          {blog.title} by {blog.author}
          <IconButton onClick={toggleExpansion}>
            <ExpandMoreIcon />
          </IconButton>
        </Typography>
        <Collapse in={isExpanded} timeout="auto" unmountOnExit>
          {details()}
        </Collapse>
      </CardContent>
    </Card>
  );
};

Blog.propTypes = {
  blog: PropTypes.shape({
    title: PropTypes.string.isRequired,
    author: PropTypes.string,
    url: PropTypes.string.isRequired,
    likes: PropTypes.number.isRequired,
    id: PropTypes.string.isRequired,
    user: PropTypes.shape({
      username: PropTypes.string.isRequired,
      name: PropTypes.string,
      id: PropTypes.string,
    }).isRequired,
  }).isRequired,
  user: PropTypes.shape({
    name: PropTypes.string,
    token: PropTypes.string,
    username: PropTypes.string.isRequired,
  }).isRequired,
};

export default Blog;
