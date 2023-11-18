const express = require('express');
const bcrypt = require('bcrypt');
const db = require('../db/connection');
const { addUser } = require('../db/queries/users');
const router  = express.Router();

router.get('/', (req, res) => {
  // template variable for document title
  res.locals.title = 'Register';
  res.render('register');
});

router.post('/')

module.exports = router;
