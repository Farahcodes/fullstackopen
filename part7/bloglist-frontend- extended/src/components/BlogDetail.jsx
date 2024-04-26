// @ts-nocheck
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Container from '@mui/material/Container';

// action
import { addComment } from '../reducers/blogReducer';

const BlogDetail = () => {
  const { blogId } = useParams();
  const dispatch = useDispatch();
  const blogs = useSelector((state) => state.blogs);
  const blog = blogs.find((b) => b.id === blogId);
  const [comment, setComment] = useState('');

  const handleComment = async (event) => {
    event.preventDefault();
    dispatch(addComment(blogId, comment));
    setComment('');
  };

  if (!blog) return <div>Blog not found</div>;

  return (
    <Container maxWidth="sm">
      <Card>
        <CardContent>
          <Typography variant="h5" component="h1">
            {blog.title}
          </Typography>
          <Typography variant="body1" component="p">
            {blog.content}
          </Typography>
          <Typography variant="body2" component="p">
            Likes: {blog.likes}
          </Typography>
          <Typography variant="h6" component="h3">
            Comments
          </Typography>
          {blog.comments && blog.comments.length > 0 ? (
            <List>
              {blog.comments.map((c, index) => (
                <ListItem key={index}>{c}</ListItem>
              ))}
            </List>
          ) : (
            <Typography variant="body2" component="p">
              No comments yet.
            </Typography>
          )}
          <form onSubmit={handleComment}>
            <TextField
              type="text"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Write a comment..."
            />
            <Button type="submit" variant="contained" color="primary">
              Add Comment
            </Button>
          </form>
        </CardContent>
      </Card>
    </Container>
  );
};

export default BlogDetail;
