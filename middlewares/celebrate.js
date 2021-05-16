const { celebrate, Joi } = require('celebrate');
const { isCelebrateError } = require('celebrate');

const linkValidation = /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/i;

module.exports.validationCard = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30)
      .error(new Joi.ValidationError('Неправильное имя')),
    link: Joi.string().pattern(linkValidation).required()
      .error(new Joi.ValidationError('Ошибка в ссылке')),
  }).unknown(true),
});

module.exports.validationUser = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required()
      .error(new Joi.ValidationError('Неправильное имя')),
    about: Joi.string().min(2).max(30).required()
      .error(new Joi.ValidationError('Неверно о себе')),
  }).unknown(true),
});

module.exports.validationAvatar = celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().pattern(linkValidation).required()
      .error(new Joi.ValidationError('Ошибка в ссылке')),
  }).unknown(true),
});

module.exports.validationSigUp = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30)
      .error(new Joi.ValidationError('Неправильное имя')),
    about: Joi.string().min(2).max(30)
      .error(new Joi.ValidationError('Неверно о себе')),
    avatar: Joi.string().pattern(linkValidation)
      .error(new Joi.ValidationError('Ошибка в ссылке')),
    email: Joi.string().required().email()
      .error(new Joi.ValidationError('E-mail не соответствует')),
    password: Joi.string().required().min(7)
      .error(new Joi.ValidationError('Пароль не корректный (минимум 7 знаков)')),
  }).unknown(true),
});

module.exports.validationSigIn = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email()
      .error(new Joi.ValidationError('Неверный E-mail или пароль')),
    password: Joi.string().required().min(4)
      .error(new Joi.ValidationError('Неверный E-mail или пароль')),
  }).unknown(true),
});

module.exports.validationCardId = celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().hex().length(24).required()
      .hex()
      .error(new Joi.ValidationError('Неверный cardId')),
  }).unknown(true),
});

module.exports.validationId = celebrate({
  params: Joi.object().keys({
    id: Joi.string().hex().length(24).required()
      .hex()
      .error(new Joi.ValidationError('Неверный Id')),
  }).unknown(true),
});
// eslint-disable-next-line consistent-return
module.exports.CelebrateError = (err, req, res, next) => {
  if (isCelebrateError(err)) {
    if (!err.details.get('body')) {
      return res.status(400).send({ message: err.details.get('params').message });
    }
    res.status(400).send({ message: err.details.get('body').message });
  } else {
    const { statusCode = 500, message } = err;
    res.status(statusCode).send({
      message: statusCode === 500 ? 'Ошибка сервера или неверный запрос' : message,
    });
  }
  next();
};
