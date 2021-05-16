/* eslint-disable comma-dangle */
const router = require('express').Router();
const auth = require('../middlewares/auth');

const {
  login,
  getUserMe,
  updateUserData,
  createUser
} = require('../controllers/user');

const {
  validationUser,
  validationSigUp,
  validationSigIn,
} = require('../middlewares/celebrate');

// POST /users — создаёт пользователя
router.post('/signup', validationSigUp, createUser);
router.post('/signin', validationSigIn, login);

router.get('/users/me', auth, getUserMe);

router.patch('/users/me', auth, validationUser, updateUserData);

module.exports = {
  router,
};
