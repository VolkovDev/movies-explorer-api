const router = require('express').Router();
const auth = require('../middlewares/auth');

const {
  // getUsers,
  // getUserById,
  createUser,
  updateUserData,
  // updateUserAvatar,
  login,
  getUserMe,
} = require('../controllers/user');

const {
  validationUser,
  // validationAvatar,
  // validationId,
  validationSigUp,
  validationSigIn,
} = require('../middlewares/celebrate');

// POST /users — создаёт пользователя
router.post('/signup', validationSigUp, createUser);
router.post('/signin', validationSigIn, login);

// router.use(auth);
// GET /users — возвращает всех пользователей
// router.get('/users', auth, getUsers);

router.get('/users/me', auth, getUserMe);

// GET /users/:id - возвращает пользователя по _id
// router.get('/users/:id', auth, validationId, getUserById);

router.patch('/users/me', auth, validationUser, updateUserData);

// router.patch('/users/me/avatar', auth, validationAvatar, updateUserAvatar);

module.exports = {
  router,
};
