const express = require('express');
const router  = express.Router();

router.get('/', (req, res) => {
  // template variable for document title
  res.locals.title = 'Register';
  res.render('register');
});

module.exports = router;
