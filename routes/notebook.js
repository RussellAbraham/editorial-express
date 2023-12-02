const express = require('express');
const { getNotebooksByUserId, createNewNotebook } = require('../db/queries/notebooks');
const { getNotesWithoutNotebookByUserId, getNotesByNotebookIdAndUserId } = require('../db/queries/notes');
const router = express.Router();

// ---------- Functions for Notebooks -----------------

// Route for handling the form submission to create a new notebook
router.post('/newNotebook', async (req, res) => {
  const { title } = req.body;
  const userId = req.cookies['user_id'];
  if (!userId) {
    return res.redirect('/login');
  }

  try {
    await createNewNotebook(userId, title);
    res.redirect('/notes');
  } catch (error) {
    console.error('Error creating notebook:', error);
    res.status(500).send('Error creating notebook');
  }
});

// Change the route to handle "/notebook/:notebookId"
router.get("/:id", async (req, res) => {
  const userId = req.cookies["user_id"];
  const notebookId = req.params.id;
  console.log(notebookId)
  if (!userId) {
    return res.redirect('/login');
  }

  try {
    // Fetch the notes for the specific notebook and user
    const notesForNotebook = await getNotesByNotebookIdAndUserId(notebookId, userId);
    const notebooks = await getNotebooksByUserId(userId);
    const notesWithoutNotebook = await getNotesWithoutNotebookByUserId(userId);
    console.log(notesForNotebook)
    const userNote = notesForNotebook;
    const templateVars = {
      notesForNotebook,
      notebookId,
      userNote,
      notebooks,
      notesWithoutNotebook
    };
    res.locals.title = "Notes";
    res.render("notes", templateVars); // You can create a new view for notes specific to a notebook
  } catch (error) {
    console.error('Error retrieving notes for notebook:', error);
    res.status(500).send('Error retrieving notes for notebook');
  }
});


module.exports = router;
