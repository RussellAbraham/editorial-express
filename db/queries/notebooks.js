const db = require('../connection');

// Function to create a new notebook in the database
const createNewNotebook = async (userId, title) => {
  try {
    const result = await db.query(
      'INSERT INTO notebooks (user_id, title) VALUES ($1, $2) RETURNING *',
      [userId, title]
    );

    return result.rows[0];
  } catch (error) {
    throw error;
  }
};

// Add other notebook-related functions if needed

module.exports = {
    createNewNotebook,
  // Add other exports as needed
};
