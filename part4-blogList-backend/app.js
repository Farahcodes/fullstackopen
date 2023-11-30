/* eslint-disable semi */
const config = require('./utils/config');
const express = require('express');
const app = express();
const cors = require('cors');
const blogsRouter = require('./controllers/blogs');
const usersRouter = require('./controllers/users');
const loginRouter = require('./controllers/login');
const {
  tokenExtractor,
  userExtractor,
} = require('./middleware/tokenExtractor');
const middleware = require('./utils/middleware');
const logger = require('./utils/logger');
const mongoose = require('mongoose');

logger.info('connecting to', config.MONGODB_URI);
mongoose
  .connect(config.MONGODB_URI)
  .then(() => {
    logger.info('connected to MongoDB');
  })
  .catch((error) => {
    logger.error('error connecting to MongoDB:', error.message);
  });

// First enable CORS and JSON parsing
app.use(cors());
app.use(express.json());

// Then use the request logger
app.use(middleware.requestLogger);

// Then apply the tokenExtractor middleware globally
app.use(tokenExtractor);

// define routes, using the userExtractor middleware where needed
app.use('/api/login', loginRouter);
app.use('/api/users', usersRouter);
app.use('/api/blogs', userExtractor, blogsRouter); // Apply userExtractor only to blog routes

// Use error handling middleware last
app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
