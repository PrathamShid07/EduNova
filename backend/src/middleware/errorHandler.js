// 📁 middleware/errorHandler.js
const errorHandler = (err, req, res, next) => {
  console.error('Error:', err);
  res.status(err.statusCode || 500).json({
    error: true,
    message: err.message || 'Internal Server Error',
    statusCode: err.statusCode || 500,
    timestamp: new Date().toISOString()
  });
};

module.exports = errorHandler;