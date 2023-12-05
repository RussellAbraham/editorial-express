// In your notes.js route file or a new route file
const express = require('express');
const router = express.Router();
const { getUserById } = require('../db/queries/users');
const { getNotesByNotebookId, getNotesWithoutNotebookByUserId, getNotes } = require('../db/queries/notes');
const { getNotebooksByUserId, createNewNotebook } = require('../db/queries/notebooks');

router.get('/', async (req, res) => {
  const userId = req.cookies['user_id'];

  if (!userId) {
    return res.redirect('/login');
  }

  try {
    const loggedInUser = await getUserById(userId);
    const notebooks = await getNotebooksByUserId(userId);
    const notesWithoutNotebook = await getNotesWithoutNotebookByUserId(userId);
    const allNotes = await getNotes(userId);
    const templateVars = {
      loggedInUser,
      allNotes,
      notebooks,
      notesWithoutNotebook,
    };
    res.locals.title = 'Notebooks';
    res.render('notebooks', templateVars);
  } catch (error) {
    console.error('Error retrieving catalogue:', error);
    res.status(500).send('Error retrieving catalogue');
  }
});


// Route for handling the form submission to create a new notebook
router.post('/newNotebook', async (req, res) => {
  const { title } = req.body;
  const userId = req.cookies['user_id'];
  if (!userId) {
    return res.redirect('/login');
  }

  try {
    await createNewNotebook(userId, title);
    res.redirect('/notebooks');
  } catch (error) {
    console.error('Error creating notebook:', error);
    res.status(500).send('Error creating notebook');
  }
});




module.exports = router;
