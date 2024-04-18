// @ts-nocheck
/* eslint-disable semi */

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';

// store
import { likeBlog, deleteBlog } from '../reducers/blogReducer';

const Blog = ({ blog, user }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const dispatch = useDispatch();

  const ownedByUser = user && user.username === blog.user.username;

  const blogStyle = {
    border: '1px solid black',
    margin: '5px 0px',
    padding: '4px',
  };

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
      <div>{blog.url}</div>
      <div>
        Likes: {blog.likes}
        <button onClick={handleLike}>like</button>
      </div>
      {ownedByUser && <button onClick={handleDelete}>Remove</button>}
    </>
  );

  return (
    <div style={blogStyle}>
      <div>
        {blog.title} by {blog.author}
        <button onClick={toggleExpansion}>
          {isExpanded ? 'Hide Details' : 'Show Details'}
        </button>
      </div>
      {isExpanded && details()}
    </div>
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
