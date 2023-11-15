const express = require('express');
const router  = express.Router();

router.get('/', (req, res) => {
  // template variable for the document title
  res.locals.title = 'Login';
  res.render('login');
});

module.exports = router;
