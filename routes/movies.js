const router = require('express').Router();
// cons = require('../middleware');
const {
  getMovies,
  createMovie,
  deleteMovie,
} = require('../controllers/movies');
const {
  validateMovie,
  validationDeleteMovie,
} = require('../middlewares/celebrate');

router.get('/movies', getMovies);

router.post('/movies', validateMovie, createMovie);

router.delete('/movies/:movieId', validationDeleteMovie, deleteMovie);

module.exports = router;
