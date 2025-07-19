const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const connectDB = require('./src/utils/database');
const errorHandler = require('./src/middleware/errorHandler');
const cronService = require('./src/services/cronService');
const authRoutes = require('./src/routes/auth');
const userRoutes = require('./src/routes/users');
const eventRoutes = require('./src/routes/events');
const providerRoutes = require('./src/routes/providers');
const contactRoutes = require('./src/routes/contacts');
const notificationRoutes = require('./src/routes/notifications');
const { MONGODB_URI } = require('./src/config/env');

const app = express();

// Middleware
app.use(cors());
app.use(helmet());
app.use(morgan('combined'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/providers', providerRoutes);
app.use('/api/contacts', contactRoutes);
app.use('/api/notifications', notificationRoutes);


// Error Handling
app.use(errorHandler);

// Database Connection and Server Start
const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await connectDB(MONGODB_URI);
    cronService.startCronJobs();
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();

module.exports = app;