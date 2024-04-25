// @ts-nocheck
import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

// action
import { addComment } from '../reducers/blogReducer';

const BlogDetail = () => {
  const { blogId } = useParams();
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
    <div>
      <h1>{blog.title}</h1>
      <p>{blog.content}</p>
      <p>Likes: {blog.likes}</p>
      <h3>Comments</h3>
      {blog.comments && blog.comments.length > 0 ? (
        <ul>
          {blog.comments.map((c, index) => (
            <li key={index}>{c}</li>
          ))}
        </ul>
      ) : (
        <p>No comments yet.</p>
      )}
      <form onSubmit={handleComment}>
        <input
          type="text"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Write a comment..."
        />
        <button type="submit">Add Comment</button>
      </form>
    </div>
  );
};

export default BlogDetail;
