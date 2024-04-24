// @ts-nocheck
import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

const UserDetail = () => {
  const { userId } = useParams();
  const users = useSelector((state) => state.users.data);
  const user = users.find((user) => user.id === userId);

  if (!user) return <div>User not found</div>;

  return (
    <div>
      <h2>{user.name}</h2>
      <h3>Blogs posted by the user:</h3>
      <ul>
        {user.blogs.map((blog) => (
          <li key={blog.id}>{blog.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default UserDetail;
