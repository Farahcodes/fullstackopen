/* eslint-disable semi */
const blogsRouter = require('express').Router();
const Blog = require('../models/blog');

blogsRouter.get('/', (request, response) => {
  Blog.find({}).then((blogs) => {
    response.json(blogs);
  });
});

blogsRouter.post('/', async (request, response) => {
  const { title, url } = request.body;

  if (!title || !url) {
    return response
      .status(400)
      .json({ error: 'Title or URL missing' });
  }

  const blog = new Blog(request.body);

  try {
    const savedBlog = await blog.save();
    response.status(201).json(savedBlog);
  } catch (error) {
    response
      .status(500)
      .json({ error: 'There was an error saving the blog.' });
  }
});

module.exports = blogsRouter;
