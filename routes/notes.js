const express = require('express');
const bcrypt = require('bcrypt');
const db = require('../db/connection');
const { getUserById } = require('../db/queries/users');
const { getNotes, getNoteById, deleteNoteByNoteId, createNote, updateNote } = require('../db/queries/notes');
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

// New route to handle note deletion using POST
router.post('/delete/:id', async (req, res) => {
  const noteId = req.params.id;

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
});

// Route for rendering the form
router.get('/new', (req, res) => {
  res.locals.title = 'New Note';
  res.render('newNoteForm');
});

// Route for handling the form submission
router.post('/new', async (req, res) => {
  const { title, body } = req.body;
  const userId = req.cookies['user_id'];

  try {
    // Call a function to create a new note in the database
    await createNote(userId, title, body);

    // Redirect the user to the notes page or any other page you prefer
    res.redirect('/notes');
  } catch (error) {
    console.error('Error creating note:', error);
    res.status(500).send('Error creating note');
  }
});

// Route for reading a specific note
router.get('/read/:id', async (req, res) => {
  const noteId = req.params.id;
  const note = await getNoteById(noteId);
  res.locals.title = 'New Note';

  // Render the editor view with the note content
  res.render('editor', { note });
});

// POST route to handle the update
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


// router.post('/updates-note', async (req, res) => {
//   try {
//     // Your updateNote logic here...
//     console.log(req)

//     res.json({ success: true, message: 'Note updated successfully' });
//   } catch (error) {
//     console.error('Error updating note:', error);
//     res.status(500).json({ success: false, message: 'Error updating note' });
//   }
// });








router.get('/:id', async (req, res) => {
  const note = await getNoteById(req.params.id)

  res.locals.title = note.title
  const templateVars = {
    note
  }
  res.render('editor', templateVars)
});



module.exports = router;
