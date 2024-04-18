/* eslint-disable semi */
// @ts-nocheck
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';

// components
import Blog from './Blog';
import AddBlogForm from './AddBlogForm';
import Togglable from './Togglable';
// store
import { fetchBlogs } from '../reducers/blogReducer';

const BlogList = () => {
  const blogs = useSelector((state) => state.blogs);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchBlogs());
  }, [dispatch]);

  return (
    <div className="blog-list">
      <h1>Blogs</h1>
      <Togglable buttonLabel="Add blog">
        <AddBlogForm />
      </Togglable>
      <div className="blogs">
        {blogs
          .sort((a, b) => b.likes - a.likes)
          .map((blog) => (
            <Blog key={blog.id} blog={blog} />
          ))}
      </div>
    </div>
  );
};

BlogList.propTypes = {
  blogs: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      author: PropTypes.string,
      url: PropTypes.string.isRequired,
      likes: PropTypes.number.isRequired,
      id: PropTypes.string.isRequired,
      user: PropTypes.shape({
        username: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        id: PropTypes.string.isRequired,
      }).isRequired,
    })
  ).isRequired,
  addBlog: PropTypes.func.isRequired,
  updateBlog: PropTypes.func.isRequired,
  removeBlog: PropTypes.func.isRequired,
  user: PropTypes.shape({
    name: PropTypes.string.isRequired,
    token: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
  }).isRequired,
};

export default BlogList;
