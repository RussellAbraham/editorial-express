const express = require('express');
const bcrypt = require('bcrypt');
const db = require('../db/connection');
const { getUserById } = require('../db/queries/users');
const { getNotes, getNoteById, deleteNoteByNoteId, createNote, updateNote } = require('../db/queries/notes');
const router = express.Router();

router.get("/", async (req, res) => {
  const userId = req.cookies["user_id"];
  if (!userId) {
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
  const userId = req.cookies["user_id"];
  if (!userId) {
    res.status(500).send('User currently not logged in!')
  } else {
    try {
      await deleteNoteByNoteId(noteId);
      res.redirect('/notes');
    } catch (error) {
      console.error('Error deleting note:', error);
      res.status(500).send('Error deleting note');
    }
  }
});

// Route for handling the form submission
router.post('/new', async (req, res) => {
  const { title } = req.body;
  const userId = req.cookies['user_id'];
  if (!userId) {
    return res.redirect('/login');
  }
  try {
    await createNote(userId, title, '');
    res.redirect('/notes');
  } catch (error) {
    console.error('Error creating note:', error);
    res.status(500).send('Error creating note');
  }
});

// Route for reading a specific note
router.get('/read/:id', async (req, res) => {
  const userId = req.cookies['user_id']
  if (!userId) {
    return res.redirect('/login');
  }
  const noteId = req.params.id;
  const note = await getNoteById(noteId);
  res.locals.title = 'Editor';
  res.render('editor', { note });
});

// POST route to handle the update
router.post('/updateNote', async (req, res) => {
  try {
    const { noteId, updatedBody } = req.body;
    console.log("noteId:", noteId);
    console.log("updatedBody:", updatedBody);
    await updateNote(noteId, updatedBody);
    res.json({ success: true, message: 'Note updated successfully' });
  } catch (error) {
    console.error('Error updating note:', error);
    res.status(500).json({ success: false, message: 'Error updating note' });
  }
});

// Handle commands from the terminal
router.post('/command', async (req, res) => {
  const { command } = req.body;
  const splitString = command.split(' ').slice(1).join(' ');

  console.log(splitString)

  try {
    // Parse and execute commands as needed
    // Example: Execute a query
    const result = await db.query(splitString);
    res.json({ result: result.rows });
  } catch (error) {
    console.error('Error executing command:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
