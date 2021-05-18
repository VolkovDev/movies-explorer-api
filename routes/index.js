const router = require('express').Router();
const userRouter = require('./user');
const moviesRouter = require('./movies');
const authorisation = require('./authorisation');
const NotFoundError = require('../errors/NotFoundError');

router.use('/', authorisation, userRouter);
router.use('/', authorisation, moviesRouter);

router.use((req) => {
  throw new NotFoundError(`По адресу ${req.path} ничего не найдено`);
});

module.exports = router;
