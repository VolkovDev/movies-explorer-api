const jwt = require('jsonwebtoken');
const AuthorisationError = require('../errors/AuthorisationError');

const { JWT_SECRET, NODE_ENV } = process.env;

module.exports = (req, res, next) => {
  const token = req.headers.authorization && req.headers.authorization.replace('Bearer ', '');
  let payload;
  try {
    payload = jwt.verify(token, `${NODE_ENV === 'production' ? JWT_SECRET : 'very-secret-key'}`);
  } catch (err) {
    throw new AuthorisationError('Необходима авторизация');
  }

  req.user = payload;
  next();
};
