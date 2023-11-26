const express = require('express');
const bcrypt = require('bcrypt');
const db = require('../db/connection');
const { createNewNotebook } = require('../db/queries/notebooks');
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

module.exports = router;