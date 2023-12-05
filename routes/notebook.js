const express = require('express');
const { getUserById } = require('../db/queries/users');
const { getNotebooksByUserId, createNewNotebook, deleteNotebookById, getNotebookByNotebookId, updateNotebookTitle } = require('../db/queries/notebooks');
const { getNotesWithoutNotebookByUserId, getNotesByNotebookIdAndUserId, getNotes } = require('../db/queries/notes');
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
    const loggedInUser = await getUserById(userId);
    const allNotes = await getNotes(userId);
    const notesForNotebook = await getNotesByNotebookIdAndUserId(notebookId, userId);
    const notebooks = await getNotebooksByUserId(userId);
    const notesWithoutNotebook = await getNotesWithoutNotebookByUserId(userId);
    const thisNotebook = await getNotebookByNotebookId(notebookId);
    console.log(notesForNotebook)
    const userNote = notesForNotebook;
    const templateVars = {
      loggedInUser,
      allNotes,
      notesForNotebook,
      notebookId,
      userNote,
      notebooks,
      notesWithoutNotebook,
      thisNotebook
    };
    console.log(templateVars);
    res.locals.title = "Notes";
    res.render("notes", templateVars); // You can create a new view for notes specific to a notebook
  } catch (error) {
    console.error('Error retrieving notes for notebook:', error);
    res.status(500).send('Error retrieving notes for notebook');
  }
});
router.post('/updateNotebookTitle', async (req, res) => {

  const { noteId, updatedTitle } = req. body;
    try {
      await updateNotebookTitle(noteId, updatedTitle);
      // res.redirect('/notebooks'); // Redirect back to the notes page after deletion
      res.json({success: true, message: "Notebook Title successfully deleted"})
    } catch (error) {
      console.error('Error deleting note:', error);
      res.status(500).send('Error deleting note');
    }
});


// delete notebooks and notes
// New route to handle note deletion using POST
router.post('/delete/:id', async (req, res) => {
  const notebookId = req.params.id;
  const userId = req.cookies["user_id"];

  if (!userId) {
    res.status(500).send('User currently not logged in!')
  } else {
    try {
      await deleteNotebookById(notebookId);
      // res.redirect('/notebooks'); // Redirect back to the notes page after deletion
      res.json({success: true, message: "Notebook successfully deleted"})
    } catch (error) {
      console.error('Error deleting note:', error);
      res.status(500).send('Error deleting note');
    }
  }
});


module.exports = router;
