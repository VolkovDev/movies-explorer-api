const { isCelebrateError } = require('celebrate');

const allErrors = (err, req, res, next) => {
  if (isCelebrateError(err)) {
    if (!err.details.get('body')) {
      res.status(400).send({ message: err.details.get('params').message });
    }
    res.status(400).send({ message: err.details.get('body').message });
  } else {
    const { statusCode = 500, message } = err;
    res.status(statusCode).send({
      message: statusCode === 500 ? 'Ошибка сервера или неправильный запрос' : message,
    });
  }
  next();
};

module.exports = {
  allErrors,
};
