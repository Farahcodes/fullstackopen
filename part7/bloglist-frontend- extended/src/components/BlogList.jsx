// @ts-nocheck
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

// components
import Blog from './Blog';
import AddBlogForm from './AddBlogForm';
import Togglable from './Togglable';
// actions
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
            <div key={blog.id}>
              <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
            </div>
          ))}
      </div>
    </div>
  );
};

export default BlogList;
