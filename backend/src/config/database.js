const { MONGODB_URI } = require('./env');

module.exports = {
  MONGODB_URI,
  options: {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
};
