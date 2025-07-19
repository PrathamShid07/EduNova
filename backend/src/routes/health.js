// src/routes/health.js
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.json({ message: 'Server is healthy', timestamp: new Date().toISOString() });
});

module.exports = router;