const mongoose = require('mongoose');
const { MONGODB_URI } = require('../config/env'); // Adjust path as needed

beforeAll(async () => {
  await mongoose.connect(MONGODB_URI.replace('course-provider', 'course-provider-test'), {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

afterAll(async () => {
  await mongoose.connection.db.dropDatabase(); // optional: wipe DB
  await mongoose.disconnect();
});
