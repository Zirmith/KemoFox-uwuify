const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const axios = require('axios');
const uwuRoutes = require('./src/routes/KemoRoutes');

dotenv.config();
const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// IP Tracking Middleware
app.use((req, res, next) => {
  const ip = req.ip || req.connection.remoteAddress;
  axios.get(`https://ipinfo.io/${ip}/json?`)
    .then(response => {
      req.ipInfo = response.data;
      next();
    })
    .catch(err => {
      console.error('Error retrieving IP info:', err.message);
      req.ipInfo = { error: 'Could not retrieve IP info' };
      next();
    });
});

// Routes
app.use('/uwuify', uwuRoutes);

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal Server Error' });
});

// Start server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
