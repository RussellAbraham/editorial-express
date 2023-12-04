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

const getNotebooksByUserId = async (userId) => {
  try {
    const query = `
      SELECT *
      FROM notebooks
      WHERE user_id = $1;
    `;
    const result = await db.query(query, [userId]);
    return result.rows;
  } catch (error) {
    throw new Error(`Error getting notebooks: ${error.message}`);
  }
};

const getNotesByNotebookId = async (notebookId) => {
  try {
    const query = `
      SELECT *
      FROM notes
      WHERE notebook_id = $1;
    `;
    const result = await db.query(query, [notebookId]);
    return result.rows;
  } catch (error) {
    throw new Error(`Error getting notes by notebook ID: ${error.message}`);
  }
};

// Function to delete a notebook by ID
// TODO: Delete Notebooks and notes belonging 
const deleteNotebookById = async function (notebookId) {
  try {
    const result = await db.none('DELETE FROM notebooks WHERE id = $1', [notebookId]);
    console.log('Notebook deleted successfully');
    return result;
  } catch (error) {
    console.error('Error deleting notebook:', error);
    throw error; // Re-throw the error for handling in the calling function
  }
}


module.exports = {
  createNewNotebook,
  getNotesByNotebookId,
  getNotebooksByUserId,
  deleteNotebookById
};
