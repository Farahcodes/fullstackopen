// @ts-nocheck
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  List,
  ListItem,
  ListItemText,
  Typography,
  Container,
} from '@mui/material';

// components
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
    <Container>
      <Typography variant="h1" component="h1">
        Blogs
      </Typography>
      <Togglable buttonLabel="Add blog">
        <AddBlogForm />
      </Togglable>
      <List>
        {blogs
          .sort((a, b) => b.likes - a.likes)
          .map((blog) => (
            <ListItem
              key={blog.id}
              component={Link}
              to={`/blogs/${blog.id}`}
            >
              <ListItemText primary={blog.title} />
            </ListItem>
          ))}
      </List>
    </Container>
  );
};

export default BlogList;
