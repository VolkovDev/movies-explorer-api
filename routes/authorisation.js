const router = require('express').Router();
const { login, createUser } = require('../controllers/user');

const { validationSigIn, validationSigUp } = require('../middlewares/celebrate');

router.post('/signin', validationSigIn, login);

router.post('/signup', validationSigUp, createUser);

module.exports = router;
