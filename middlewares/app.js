/* eslint-disable no-console */
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const cors = require('cors');
const { errors } = require('celebrate');
const { CelebrateError } = require('../../react-mesto-api-full/backend/middlewares/celebrate');
const { requestLogger, errorLogger } = require('../../react-mesto-api-full/backend/middlewares/logger');
// const auth = require('./middlewares/auth');
const NotFoundError = require('../../react-mesto-api-full/backend/errors/NotFoundError');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Пожалуйста, попробуйте позже',
});

// Слушаем 3000 порт
const { PORT = 3002 } = process.env;

const app = express();

app.use(cors());

//  apply to all requests
app.use(limiter);

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  next();
});

app.use(bodyParser.json());
app.use(cookieParser());

app.use(helmet());

// app.use(auth);

mongoose.connect('mongodb://localhost:27017/bitfilmsdb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

app.use(requestLogger);

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

const usersRouter = require('../../react-mesto-api-full/backend/routes/user').router;
const cardsRouter = require('../../react-mesto-api-full/backend/routes/card').router;

app.use(usersRouter);

app.use(cardsRouter);

app.use('*', () => {
  throw new NotFoundError('Запрашиваемый ресурс не найден');
});

// app.use((req) => {
//   throw new NotFoundError(`По адресу ${req.path} ничего нет`);
// });

app.use(errorLogger);

app.use(CelebrateError);

app.use(errors());

app.listen(PORT, () => {
  // Если всё работает, консоль покажет, какой порт приложение слушает
  console.log(`App listening on port: ${PORT}`);
});
