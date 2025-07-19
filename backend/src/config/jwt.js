const { JWT_SECRET } = require('./env');

module.exports = {
  JWT_SECRET,
  expiresIn: '1d'
};
