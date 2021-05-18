const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const cors = require('cors');
const { errors } = require('celebrate');
const { CelebrateError } = require('./middlewares/celebrate');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const auth = require('./middlewares/auth');
const router = require('./routes');
// const NotFoundError = require('./errors/NotFoundError');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Пожалуйста, попробуйте позже',
});

// Слушаем 3000 порт
const { PORT = 3002 } = process.env;

const app = express();

app.use(cors());

app.use(requestLogger);
//  apply to all requests
app.use(limiter);

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  next();
});

app.use(bodyParser.json());
app.use(cookieParser());

app.use(helmet());

mongoose.connect('mongodb://localhost:27017/bitfilmsdb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

// const usersRouter = require('./routes/user').router;
// const movieRouter = require('./routes/movies').router;

// app.use(usersRouter);

// app.use(movieRouter);

// app.use('*', () => {
//   throw new NotFoundError('Запрашиваемый ресурс не найден');
// });

// app.use((req) => {
//   throw new NotFoundError(`По адресу ${req.path} ничего нет`);
// });

app.use(require('./routes/authorisation'));

app.use(auth);

app.use(router);

app.use(errorLogger);

app.use(CelebrateError);

app.use(errors());

app.listen(PORT, () => {
  // Если всё работает, консоль покажет, какой порт приложение слушает
  // console.log(`All fine! App listening on port: ${PORT}`);
});
