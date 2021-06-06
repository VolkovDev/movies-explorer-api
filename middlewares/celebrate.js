const { celebrate, Joi } = require('celebrate');

const linkValidation = /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/i;

module.exports.validationUser = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30)
      .error(new Joi.ValidationError('Неправильное имя')),
    link: Joi.string().pattern(linkValidation).required()
      .error(new Joi.ValidationError('Ошибка в ссылке')),
  }).unknown(true),
});

module.exports.validateMovie = celebrate({
  body: Joi.object().keys({
    country: Joi.string().min(2).max(30).required()
      .error(new Joi.ValidationError('Какое-то одно из полей описания фильма не верно')),
    director: Joi.string().min(2).max(30).required()
      .error(new Joi.ValidationError('Какое-то одно из полей описания фильма не верно')),
    duration: Joi.number().required()
      .error(new Joi.ValidationError('Какое-то одно из полей описания фильма не верно')),
    year: Joi.string().min(2).max(30).required()
      .error(new Joi.ValidationError('Какое-то одно из полей описания фильма не верно')),
    description: Joi.string().min(2).required()
      .error(new Joi.ValidationError('Какое-то одно из полей описания фильма не верно')),
    image: Joi.string().pattern(linkValidation).required()
      .error(new Joi.ValidationError('Ошибка в ссылке')),
    trailer: Joi.string().pattern(linkValidation).required()
      .error(new Joi.ValidationError('Ошибка в ссылке')),
    thumbnail: Joi.string().pattern(linkValidation).required()
      .error(new Joi.ValidationError('Ошибка в ссылке')),
    nameRU: Joi.string().min(2).max(30).required()
      .error(new Joi.ValidationError('Какое-то одно из полей описания фильма не верно')),
    nameEN: Joi.string().min(2).max(30).required()
      .error(new Joi.ValidationError('Какое-то одно из полей описания фильма не верно')),
    movieId: Joi.number().required()
      .error(new Joi.ValidationError('Какое-то одно из полей описания фильма не верно')),
  }).unknown(true),
});

module.exports.validationSigIn = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email()
      .error(new Joi.ValidationError('Неверный E-mail или пароль')),
    password: Joi.string().required().min(7)
      .error(new Joi.ValidationError('Неверный E-mail или пароль')),
  }).unknown(true),
});

module.exports.validationSigUp = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30)
      .error(new Joi.ValidationError('Неправильное имя')),
    email: Joi.string().required().email()
      .error(new Joi.ValidationError('E-mail не соответствует')),
    password: Joi.string().required().min(7)
      .error(new Joi.ValidationError('Пароль не корректный (минимум 7 знаков)')),
  }).unknown(true),
});

module.exports.validationUser = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30)
      .error(new Joi.ValidationError('Неправильное имя')),
    email: Joi.string().required().email()
      .error(new Joi.ValidationError('Неверный  Email')),
  }).unknown(true),
});

module.exports.validationDeleteMovie = celebrate({
  params: Joi.object().keys({
    movieId: Joi.string().required().length(24).hex(),
  }).unknown(true),
});
