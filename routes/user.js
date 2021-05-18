const router = require('express').Router();
// cons = require('../middleware');

const {
  getUserMe,
  updateUserData,
} = require('../controllers/user');

const {
  validationUser,
} = require('../middlewares/celebrate');

router.get('/users/me', getUserMe);

router.patch('/users/me', validationUser, updateUserData);

module.exports = router;
