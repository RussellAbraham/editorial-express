const express = require('express');
const bcrypt = require('bcrypt');
const db = require('../db/connection');
const { getUserById } = require('../db/queries/users');
const { getNotes, getNoteById, deleteNoteByNoteId, createNote, updateNote } = require('../db/queries/notes');
const { getNotebooks, createNewNotebook } = require('../db/queries/notebooks');
const router = express.Router();

router.get("/", async (req, res) => {
  const userId = req.cookies["user_id"];

  if (!userId) {
    // Redirect to the login page or handle unauthenticated access as appropriate
    return res.redirect('/login');
  }

  try {
    const userNote = await getNotes(userId);
    const templateVars = {
      userNote,
    };
    res.locals.title = "Notes";
    res.render("notes", templateVars);
  } catch (error) {
    console.error('Error retrieving notes:', error);
    res.status(500).send('Error retrieving notes');
  }
});

// Route for reading a specific note
router.get('/read/:id', async (req, res) => {

  const userId = req.cookies['user_id']

  //if user is not logged in, redirect to the login page
  if (!userId) {
    // Redirect to the login page or handle unauthenticated access as appropriate
    return res.redirect('/login');
  }

  const noteId = req.params.id;

  const note = await getNoteById(noteId);
  res.locals.title = 'Editor';

  // Render the editor view with the note content
  res.render('editor', { note });
});

// Route for handling the form submission
router.post('/new', async (req, res) => {
  const { title } = req.body;
  const userId = req.cookies['user_id'];

  //if user is not logged in, redirect to the login page
  if (!userId) {
    // Redirect to the login page or handle unauthenticated access as appropriate
    return res.redirect('/login');
  }

  try {
    // Call a function to create a new note in the database
    await createNote(userId, title, '');

    // Redirect the user to the notes page or any other page you prefer
    res.redirect('/notes');
  } catch (error) {
    console.error('Error creating note:', error);
    res.status(500).send('Error creating note');
  }
});

// POST route to handle the update
router.post('/updateNote', async (req, res) => {
  console.log("Updating notes");

  try {
    const { noteId, updatedBody } = req.body;
    console.log("noteId:", noteId);
    console.log("updatedBody:", updatedBody);
    // console.log(req.body)

    // Call your function to update the note in the database
    await updateNote(noteId, updatedBody);

    // Respond with a success message or any other data as needed
    res.json({ success: true, message: 'Note updated successfully' });
  } catch (error) {
    console.error('Error updating note:', error);
    res.status(500).json({ success: false, message: 'Error updating note' });
  }
});

// New route to handle note deletion using POST
router.post('/delete/:id', async (req, res) => {
  const noteId = req.params.id;
  const userId = req.cookies["user_id"];

  if (!userId) {
    res.status(500).send('User currently not logged in!')
  } else {
    try {
      // Add logic to check if the note belongs to the current user or has the right permissions before deleting
      // This is just a basic example and should be enhanced based on your authentication and authorization logic
      // Add notification for when the notes have been deleted

      await deleteNoteByNoteId(noteId);
      res.redirect('/notes'); // Redirect back to the notes page after deletion
    } catch (error) {
      console.error('Error deleting note:', error);
      res.status(500).send('Error deleting note');
    }
  }
});

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


module.exports = router;
