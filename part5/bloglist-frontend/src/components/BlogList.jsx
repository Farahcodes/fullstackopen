/* eslint-disable semi */
// @ts-nocheck
import React from 'react';
import PropTypes from 'prop-types';

// components
import Blog from './Blog';
import AddBlogForm from './AddBlogForm';
import Togglable from './Togglable';

const BlogList = ({
  blogs,
  addBlog,
  updateBlog,
  removeBlog,
  user,
}) => {
  return (
    <div>
      <h1>Blogs</h1>
      <Togglable buttonLabel="Add blog">
        <AddBlogForm addBlog={addBlog} />
      </Togglable>
      <div>
        {blogs
          .sort((a, b) => (b.likes ?? 0) - (a.likes ?? 0))
          .map((blog) => (
            <Blog
              key={blog.id}
              blog={blog}
              updateBlog={updateBlog}
              removeBlog={removeBlog}
              user={user}
            />
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