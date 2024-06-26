/* eslint-disable no-unused-vars */
/* eslint-disable semi */
// eslint-disable-next-line no-unused-vars
const _ = require('lodash');

const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  return blogs.reduce((total, blog) => total + blog.likes, 0);
};

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) return null;

  let favorite = blogs[0];

  blogs.forEach((blog) => {
    if (blog.likes > favorite.likes) favorite = blog;
  });

  return {
    title: favorite.title,
    author: favorite.author,
    likes: favorite.likes,
  };
};

const mostBlogs = (blogs) => {
  if (blogs.length === 0) return null;

  const authors = _.countBy(blogs, 'author');
  const author = Object.keys(authors).reduce((a, b) =>
    authors[a] > authors[b] ? a : b
  );

  return {
    author,
    blogs: authors[author],
  };
};

const mostLikes = (blogs) => {
  const authorLikes = _(blogs)
    .groupBy('author')
    .map((objs, key) => ({
      author: key,
      likes: _.sumBy(objs, 'likes'),
    }))
    .value();

  const maxLikes = _.maxBy(authorLikes, 'likes');
  return maxLikes;
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
};
