const express = require('express');
const bcrypt = require('bcrypt');
const db = require('../db/connection');
const { addUser, getUserByUserName } = require('../db/queries/users');
const router  = express.Router();

router.get('/', (req, res) => {
  // template variable for document title
  res.locals.title = 'Register';
  res.render('register');
});

router.post('/', async (req, res) => {
  // form values from register page
  const { email, password, username } = req.body;

  try {
    const testIfUserExists = await getUserByUserName(username);
    if(testIfUserExists){
      console.log('username exists');
      return res.status(400).send('Username exists');
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    await addUser(email, hashedPassword, username);
    res.redirect('/login');
  } catch(err){
    console.error('Error');
    return res.status(500).send('Error')
  }


});

module.exports = router;
