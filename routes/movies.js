/* eslint-disable import/extensions */
const router = require('express').Router();
const auth = require('../middlewares/auth');
const {
  getMovies,
  createMovie,
  deleteMovie,
} = require('../controllers/movies');
const {
  validateMovie,
  validationDeleteMovie,
} = require('../middlewares/celebrate');

router.get('/movies', auth, getMovies);

router.post('/movies', auth, validateMovie, createMovie);

router.delete('/movies/:movieId ', auth, validationDeleteMovie, deleteMovie);

module.exports = {
  router,
};
