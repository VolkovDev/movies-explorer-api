const router = require('express').Router();
const auth = require('../middlewares/auth');
const {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
} = require('../controllers/card');
const {
  validationCard,
  validationCardId,
} = require('../middlewares/celebrate');

router.get('/movies', auth, getCards);

router.post('/movies', auth, validationCard, createCard);

router.delete('/movies/:movieId ', auth, validationCardId, deleteCard);

// router.put('/cards/:cardId/likes', auth, validationCardId, likeCard);

// router.delete('/cards/:cardId/likes', auth, validationCardId, dislikeCard);

module.exports = {
  router,
};
