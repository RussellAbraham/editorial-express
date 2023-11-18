// Configure this later
// Load .env data into process.env
require('dotenv').config();

// Web server config
const express = require('express');
const morgan = require('morgan');

const PORT = process.env.PORT || 8080;
const app = express();

app.set('view engine', 'ejs');

// Load the logger first so all (static) HTTP requests are logged to STDOUT
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));

// Separated Routes for each Resource
const loginRoutes = require('./routes/login');
const registerRoutes = require('./routes/register');

// Mount all resource routes
app.use('/login', loginRoutes);
app.use('/register', registerRoutes);

// Home page
app.get('/', (req, res) => {
  res.locals.title = 'Editorial Express';
  res.render('index');
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
