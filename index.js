const express = require('express');
const mongoose = require('./config/db');
const homepageRoute = require('./routes/homepage');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Redirect root to homepage route
app.get('/', (req, res) => {
  res.redirect('/homepage');
});

// Routes
app.use('/homepage', homepageRoute);

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
