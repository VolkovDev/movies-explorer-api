const router = require('express').Router();
const userRouter = require('./user');
const moviesRouter = require('./movies');
// const authorisation = require('./authorisation');
const auth = require('../middlewares/auth');
const NotFoundError = require('../errors/NotFoundError');

router.use(require('./authorisation'));

router.use('/', auth, userRouter);
router.use('/', auth, moviesRouter);

router.use((req) => {
  throw new NotFoundError(`По адресу ${req.path} ничего не найдено`);
});

module.exports = router;
