// Configure this later
// Load .env data into process.env
require('dotenv').config();

// Web server config
const express = require('express');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

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

// Add middleware to parse JSON
app.use(bodyParser.json());


// Separated Routes for each Resource
const loginRoutes = require('./routes/login');
const logoutRoutes = require('./routes/logout');
const registerRoutes = require('./routes/register');
const notesRoutes = require('./routes/notes');
const notebookRoutes = require('./routes/notebook'); // Import the notebook routes
const notebooksRoutes = require('./routes/notebooks'); // Import the notebooks routes


// Mount all resource routes
app.use('/login', loginRoutes);
app.use('/logout', logoutRoutes);
app.use('/register', registerRoutes);
app.use('/notes', notesRoutes);
app.use('/notebook', notebookRoutes); // Use the notebook routes in the notes routes
app.use('/notebooks', notebooksRoutes); // Use the notebooks routes in the notes routes


// Home page
app.get('/', (req, res) => {
  res.locals.title = 'Editorial Express';

  const userId  = req.cookies["user_id"];

  if (!userId) {
    return res.render('index');
  } else {
    res.redirect("/notes");
  }
});

app.listen(PORT, () => {

  console.log(`Example app listening on port ${PORT}`);
});
