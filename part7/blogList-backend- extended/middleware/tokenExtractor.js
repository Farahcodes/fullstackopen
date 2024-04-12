/* eslint-disable semi */
const jwt = require('jsonwebtoken');

const tokenExtractor = (request, response, next) => {
  const authorization = request.get('authorization');
  if (
    authorization &&
    authorization.toLowerCase().startsWith('bearer ')
  ) {
    request.token = authorization.substring(7);
  } else {
    request.token = null;
  }
  next();
};

const userExtractor = (request, response, next) => {
  const token = request.token;
  if (token) {
    const decodedToken = jwt.verify(token, process.env.SECRET);
    if (!decodedToken.id) {
      return response
        .status(401)
        .json({ error: 'token missing or invalid' });
    }
    request.user = decodedToken;
  } else {
    request.user = null;
  }
  next();
};

module.exports = {
  tokenExtractor,
  userExtractor,
};
