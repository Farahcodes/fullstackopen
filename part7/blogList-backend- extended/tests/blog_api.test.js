/* eslint-disable no-unused-vars */
/* eslint-disable semi */
const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');

const api = supertest(app);
const Blog = require('../models/blog');

const initialBlogs = [
  {
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
  },
  {
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
  },
];

beforeEach(async () => {
  await Blog.deleteMany({});
  let blogObject = new Blog(initialBlogs[0]);
  await blogObject.save();
  blogObject = new Blog(initialBlogs[1]);
  await blogObject.save();
});

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/);
}, 100000);

test('there are two blogs', async () => {
  const response = await api.get('/api/blogs');

  expect(response.body).toHaveLength(2);
});

test('unique identifier is named id', async () => {
  const response = await api.get('/api/blogs');
  expect(response.body[0].id).toBeDefined();
  expect(response.body[0]._id).toBeUndefined();
});

test('a valid blog can be added', async () => {
  const newBlog = {
    title: 'New Blog Title',
    author: 'Test Author',
    url: 'http://testblog.com/',
    likes: 10,
  };

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/);

  const response = await api.get('/api/blogs');
  const contents = response.body.map((r) => r.title);

  expect(response.body).toHaveLength(initialBlogs.length + 1);
  expect(contents).toContain(newBlog.title);
});

test('if likes property is missing, it defaults to zero', async () => {
  const newBlog = {
    title: 'Another New Blog',
    author: 'Test Author 2',
    url: 'http://anothernewblog.com/',
  };

  const response = await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/);

  expect(response.body.likes).toBe(0);
});

test('if title is missing, response status is 400', async () => {
  const newBlog = {
    author: 'Missing Title Author',
    url: 'http://missingtitle.com/',
    likes: 5,
  };

  await api.post('/api/blogs').send(newBlog).expect(400);
}, 10000);

test('if url is missing, response status is 400', async () => {
  const newBlog = {
    title: 'Missing URL Blog',
    author: 'Missing URL Author',
    likes: 5,
  };

  await api.post('/api/blogs').send(newBlog).expect(400);
}, 10000);

describe('deletion of a blog', () => {
  test('succeeds with status code 204 if id is valid', async () => {
    const blogsAtStart = await Blog.find({});
    const blogToDelete = blogsAtStart[0];

    await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204);

    const blogsAtEnd = await Blog.find({});
    expect(blogsAtEnd).toHaveLength(blogsAtStart.length - 1);

    const titles = blogsAtEnd.map((blog) => blog.title);
    expect(titles).not.toContain(blogToDelete.title);
  });
});

describe('updating a blog', () => {
  test('succeeds with valid id and data', async () => {
    const blogsAtStart = await Blog.find({});
    const blogToUpdate = blogsAtStart[0];

    const updatedBlogData = {
      likes: blogToUpdate.likes + 1,
    };

    await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send(updatedBlogData)
      .expect(200)
      .expect('Content-Type', /application\/json/);

    const updatedBlog = await Blog.findById(blogToUpdate.id);
    expect(updatedBlog.likes).toBe(blogToUpdate.likes + 1);
  });
});
