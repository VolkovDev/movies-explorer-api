/* eslint-disable no-unused-vars */
/* eslint-disable no-shadow */
const Card = require('../../react-mesto-api-full/backend/models/card');
const NotFoundError = require('../../react-mesto-api-full/backend/errors/NotFoundError');
const ForbiddenError = require('../../react-mesto-api-full/backend/errors/ForbiddenError');
const BadRequestError = require('../../react-mesto-api-full/backend/errors/BadRequestError');

module.exports.getCards = (req, res, next) => {
  Card.find({})
    .then((cards) => res.send(cards))
    .catch(next);
};

module.exports.createCard = (req, res, next) => {
  const userId = req.user._id;
  const { name, link } = req.body;

  Card.create({ name, link, owner: userId })
    .then((card) => res.status(201).send({ data: card }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        throw new BadRequestError('Переданы некорректные данные при создании карточки');
      }
    })
    .catch(next);
};

module.exports.deleteCard = (req, res, next) => {
  const { cardId } = req.params;
  Card.findById(cardId)
    .orFail(() => {
      throw new NotFoundError('Карточка с указанным cardId не найдена!');
    })
    .then((card) => {
      if (card.owner._id.toString() === req.user._id) {
        Card.findByIdAndRemove(cardId)
          .then((card) => res.send(card))
          .catch((err) => {
            if (err.name === 'CastError') {
              throw new BadRequestError('Переданы некорректные данные');
            }
          })
          .catch(next);
      } else {
        throw new ForbiddenError('Недостаточно прав для удаления карточки');
      }
      return res.status(200).send({ message: 'Карточка удалена' });
    })
    .catch(next);
};

module.exports.likeCard = (req, res, next) => {
  const userId = req.user._id;
  const { cardId } = req.params;
  Card.findById(cardId)
    .orFail(() => {
      throw new NotFoundError('Карточка с указанным cardId не найдена!');
    })
    .then((card) => {
      Card.findByIdAndUpdate(
        cardId,
        { $addToSet: { likes: userId } },
        { new: true },
      )
        .then((card) => res.send(card))
        .catch((err) => {
          if (err.name === 'CastError') {
            throw new BadRequestError('Переданы некорректные данные для постановки лайка');
          }
        })
        .catch(next);
    })
    .catch(next);
};

module.exports.dislikeCard = (req, res, next) => {
  const { cardId } = req.params;
  Card.findById(cardId)
    .orFail(() => {
      throw new NotFoundError('Карточка этим cardId не найдена!');
    })
    .then((card) => {
      Card.findByIdAndUpdate(
        cardId,
        { $pull: { likes: req.user._id } },
        { new: true },
      )
        // eslint-disable-next-line no-shadow
        .then((card) => res.status(200).send(card))
        .catch((err) => {
          if (err.name === 'CastError') {
            throw new BadRequestError('Не верный cardId');
          }
        })
        .catch(next);
    })
    .catch(next);
};
