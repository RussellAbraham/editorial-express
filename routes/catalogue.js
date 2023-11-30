// In your notes.js route file or a new route file
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const db = require('../db/connection');
const { getNotesByNotebookId, getNotesWithoutNotebookByUserId } = require('../db/queries/notes');
const { getNotebooksByUserId } = require('../db/queries/notebooks');

router.get('/', async (req, res) => {
  const userId = req.cookies['user_id'];

  if (!userId) {
    // Redirect to the login page or handle unauthenticated access as appropriate
    return res.redirect('/login');
  }

  try {
    const notebooks = await getNotebooksByUserId(userId);
    const notesWithoutNotebook = await getNotesWithoutNotebookByUserId(userId);
    const templateVars = {
      notebooks,
      notesWithoutNotebook,
    };
    res.locals.title = 'Catalogue';
    res.render('catalogue', templateVars);
  } catch (error) {
    console.error('Error retrieving catalogue:', error);
    res.status(500).send('Error retrieving catalogue');
  }
});



// Example route for notebook details
router.get('/catalogue/notebook/:id', async (req, res) => {
  const notebookId = req.params.id;
  // Fetch notebook details and associated notes
  // Render a template with notebook details and associated notes
});

// Example route for note details
router.get('/catalogue/note/:id', async (req, res) => {
  const noteId = req.params.id;
  // Fetch note details
  // Render a template with note details
});


module.exports = router;