// Configure this later
// Load .env data into process.env
require('dotenv').config();

// Web server config
const express = require('express');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');

const PORT = process.env.PORT || 8080;
const app = express();

app.set('view engine', 'ejs');

//app.use(cookieSession({
//  name : 'session',
//  keys : ['EDITOR'],
//  maxAge : 24 * 60 * 60 * 1000
//}));
// Load the logger first so all (static) HTTP requests are logged to STDOUT
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));

// Use cookie-parser middleware
app.use(cookieParser());

// Separated Routes for each Resource
const loginRoutes = require('./routes/login');
const logoutRoutes = require('./routes/logout');
const registerRoutes = require('./routes/register');
const notesRoutes = require('./routes/notes');

// Mount all resource routes
app.use('/login', loginRoutes);
app.use('/logout', logoutRoutes);
app.use('/register', registerRoutes);
app.use('/notes', notesRoutes);

// Home page
app.get('/', (req, res) => {
  res.locals.title = 'Editorial Express';
  res.render('index')

});

app.listen(PORT, () => {

  console.log(`Example app listening on port ${PORT}`);
});
