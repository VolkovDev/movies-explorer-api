const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const cors = require('cors');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const router = require('./routes');
const { allErrors } = require('./middlewares/allErrors');
const env = require('./utils/env');
const { limiter } = require('./utils/limiter');

const { PORT, MONGODB_URL } = env();

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

mongoose.connect(MONGODB_URL, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

// app.use(require('./routes/authorisation'));

// app.use(auth);

app.use(router);

app.use(errorLogger);

app.use(allErrors);

app.listen(PORT, () => {
});
