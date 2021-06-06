require('dotenv').config();

module.exports = () => {
  const {
    NODE_ENV = 'development',
    PORT = 3002,
    MONGODB_URL = 'mongodb://localhost:27017/bitfilmsdb',
    JWT_SECRET = 'very-secret-key',
  } = process.env;

  if (NODE_ENV === 'production') {
    if (!process.env.MONGODB_URL) throw new Error('В production обязательно MONGODB_URL в .env');
    if (!process.env.JWT_SECRET) throw new Error('В production обязательно JWT_SECRET в .env');
  }

  return {
    PORT,
    JWT_SECRET,
    MONGODB_URL,
  };
};
