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

blogsRouter.delete('/:id', async (request, response) => {
  try {
    await Blog.findByIdAndRemove(request.params.id);
    response.status(204).end();
  } catch (error) {
    response.status(400).send({ error: 'Invalid id format' });
  }
});

module.exports = blogsRouter;
