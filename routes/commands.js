const express = require('express');
const db = require('../db/connection');
const router = express.Router();

// Handle commands from the terminal
router.post('/', async (req, res) => {
  const { command } = req.body;
  const splitString = command.split(' ').slice(1).join(' ');
  try {
    const result = await db.query(splitString);
    res.json({ result: result.rows });
  } catch (error) {
    console.error('Error executing command:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
