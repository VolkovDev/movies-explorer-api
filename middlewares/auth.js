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
// module.exports = (req, res, next) => {
//   const { authorization } = req.headers;

//   if (!authorization || !authorization.startsWith('Bearer ')) {
//     throw new AuthorisationError('Необходима авторизация');
//   }

//   const token = authorization.replace('Bearer ', '');
//   let payload;

//   try {
//     payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'very-secret-key');
//     req.user = payload;
//     next();
//   } catch (err) {
//     throw new AuthorisationError('Необходима авторизация');
//   }
// };
