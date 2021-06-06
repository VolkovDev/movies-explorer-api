const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const AuthorisationError = require('../errors/AuthorisationError');
const NotFoundError = require('../errors/NotFoundError');
const ConflictError = require('../errors/ConflictError');
const BadRequestError = require('../errors/BadRequestError');

const { JWT_SECRET, NODE_ENV } = process.env;

module.exports.getUserMe = (req, res, next) => {
  User.findById(req.user._id)
    .orFail(new NotFoundError('Пользователь по указанному _id не найден!'))
    .then((user) => res.status(200).send(user))
    .catch(next);
};

module.exports.createUser = (req, res, next) => {
  const {
    name,
    email,
    password,
  } = req.body;
  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name,
      email,
      password: hash,
    }))
    .then((({ _id }) => User.findById(_id)))
    .then((newUser) => res
      .status(200)
      .send({ message: `Пользователь ${newUser.email} успешно создан` }))
    .then((user) => {
      res.send({
        _id: user._id,
        name: user.name,
        email: user.email,
      });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        throw new BadRequestError('Ошибка при создании учетной записи');
      } else if (err.name === 'MongoError' && err.code === 11000) {
        throw new ConflictError('Пользователь с таким E-mail уже зарегистрирован');
      }
    })
    .catch(next);
};

module.exports.updateUserData = (req, res, next) => {
  const userId = req.user._id;
  const { name, email } = req.body;
  // console.log('id user: ', req.user._id);
  User.findByIdAndUpdate(
    userId,
    {
      name,
      email,
    },
    {
      upsert: true,
      new: true,
      runValidators: true,
    },
  )
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        throw new BadRequestError('Данные пользователя не корректны');
      }
    })
    .catch(next);
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production'
          ? JWT_SECRET
          : 'very-secret-key',
        { expiresIn: '7d' },
      );
      res
        .status(200).send({ token });
    })
    .catch((err) => {
      throw new AuthorisationError(`Пользователь не авторизован + ${err.message}`);
    })
    .catch(next);
};
