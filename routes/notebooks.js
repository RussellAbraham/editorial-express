const express = require('express');
const bcrypt = require('bcrypt');
const db = require('../db/connection');
const { createNewNotebook } = require('../db/queries/notebooks');
const { getNotesByNotebookIdAndUserId } = require('../db/queries/notes');
const router = express.Router();

// ---------- Functions for Notebooks -----------------

// Route for handling the form submission to create a new notebook
router.post('/newNotebook', async (req, res) => {
  const { title } = req.body;
  const userId = req.cookies['user_id'];

  // If the user is not logged in, redirect to the login page
  if (!userId) {
    return res.redirect('/login');
  }

  try {
    // Call a function to create a new notebook in the database
    await createNewNotebook(userId, title);

    // Redirect the user to the notes page or any other page you prefer
    res.redirect('/notes');
  } catch (error) {
    console.error('Error creating notebook:', error);
    res.status(500).send('Error creating notebook');
  }
});

// Change the route to handle "/notebook/:notebookId"
router.get("/read/:notebookId", async (req, res) => {
  const userId = req.cookies["user_id"];
  const notebookId = req.params.notebookId;

  if (!userId) {
    // Redirect to the login page or handle unauthenticated access as appropriate
    return res.redirect('/login');
  }

  try {
    // Fetch the notes for the specific notebook and user
    const notesForNotebook = await getNotesByNotebookIdAndUserId(notebookId, userId);
    const userNote = notesForNotebook;
    const templateVars = {
      notesForNotebook,
      notebookId,
      userNote
    };
    res.locals.title = "Notes";
    res.render("notes", templateVars); // You can create a new view for notes specific to a notebook
  } catch (error) {
    console.error('Error retrieving notes for notebook:', error);
    res.status(500).send('Error retrieving notes for notebook');
  }
});


module.exports = router;