/* eslint-disable no-unused-vars */
/* eslint-disable semi */
const blogsRouter = require('express').Router();
const Blog = require('../models/blog');
const User = require('../models/user');

blogsRouter.get('/', (request, response) => {
  Blog.find({}).then((blogs) => {
    response.json(blogs);
  });
});

blogsRouter.post('/', async (request, response) => {
  const { title, author, url, likes } = request.body;

  if (!title || !url) {
    return response
      .status(400)
      .json({ error: 'Title or URL missing' });
  }
  const user = await User.findOne(); // Finds the first user
  if (!user) {
    return response.status(400).json({ error: 'No users found' });
  }

  const blog = new Blog({
    title,
    author,
    url,
    likes,
    user: user._id, // Associate the user
  });

  try {
    const savedBlog = await blog.save();
    response.status(201).json(savedBlog);
  } catch (error) {
    response
      .status(500)
      .json({ error: 'There was an error saving the blog.' });
  }
});

blogsRouter.delete('/:id', async (request, response) => {
  try {
    await Blog.findByIdAndRemove(request.params.id);
    response.status(204).end();
  } catch (error) {
    response.status(400).send({ error: 'Invalid id format' });
  }
});

blogsRouter.put('/:id', async (request, response) => {
  const { likes } = request.body;

  try {
    const updatedBlog = await Blog.findByIdAndUpdate(
      request.params.id,
      { likes },
      { new: true, runValidators: true, context: 'query' }
    );
    if (updatedBlog) {
      response.json(updatedBlog);
    } else {
      response.status(404).end();
    }
  } catch (error) {
    response.status(400).json({ error: error.message });
  }
});

module.exports = blogsRouter;
