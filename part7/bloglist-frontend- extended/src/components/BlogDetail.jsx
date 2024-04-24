// @ts-nocheck
import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

const BlogDetail = () => {
  const { blogId } = useParams();
  const blogs = useSelector((state) => state.blogs);
  const blog = blogs.find((b) => b.id === blogId);

  if (!blog) return <div>Blog not found</div>;

  return (
    <div>
      <h1>{blog.title}</h1>
      <p>{blog.content}</p>
      <p>Likes: {blog.likes}</p>
    </div>
  );
};

export default BlogDetail;
