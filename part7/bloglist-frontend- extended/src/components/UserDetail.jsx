// @ts-nocheck
import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

const UserDetail = () => {
  const { userId } = useParams();
  const users = useSelector((state) => state.users.data);
  const user = users.find((user) => user.id === userId);

  if (!user) return <div>User not found</div>;

  return (
    <Box>
      <Typography variant="h2">{user.name}</Typography>
      <Typography variant="h3">Blogs posted by the user:</Typography>
      <ul>
        {user.blogs.map((blog) => (
          <li key={blog.id}>{blog.title}</li>
        ))}
      </ul>
    </Box>
  );
};

export default UserDetail;
