const db = require("../connection");

const addNewNote = (item) => {
  let queryString = `INSERT INTO notes(user_id, notebook_id, title, body) values ($1, $2, $3, $4) RETURNING *`;

  let options = [
    item.user_id,
    item.notebook_id,
    item.title,
    item.body
  ];
  return db
    .query(queryString, options)
    .then((result) => {
      return result.rows[0];
    })
    .catch((error) => {
      console.log("error :", error.message);
    });
}

const getNotes = (userId) => {
  return db.query('SELECT * FROM notes WHERE user_id = $1', [userId])
    .then(data => {
      return data.rows;
    })
    .catch((error) => {
      console.log("error :", error.message);
    });
}

const getNoteById = (noteId) => {
  return db.query('SELECT * FROM notes WHERE id = $1;', [noteId])
    .then(data => {
      return data.rows[0]
    })
    .catch((error) => {
      console.log("error :", error.message);
    });
}

const deleteNoteByNoteId = (noteId) => {
  return db.query('DELETE FROM notes WHERE id = $1;', [noteId],)
    .then(() => {
      console.log('note deleted successfully');
    })
    .catch((error) => {
      console.log("error :", error.message);
    });
}

async function createNote(userId, title, body) {
  const query = `
    INSERT INTO notes (user_id, title, body, created_at, updated_at)
    VALUES ($1, $2, $3, NOW(), NOW())
    RETURNING *;
  `;

  const values = [userId, title, body];

  const result = await db.query(query, values);
  return result.rows[0];
}


// Function to update a note in the database
const updateNote = async (noteId, updatedBody) => {
  try {
    // Use your database query to update the note
    const query = 'UPDATE notes SET body = $1, updated_at = NOW() WHERE id = $2';
    const values = [updatedBody, noteId];
    await db.query(query, values);

    // Optionally, you can return the updated note or any other data
    const updatedNote = await getNoteById(noteId);
    return updatedNote;

    // If you just want to confirm the update, you can simply return true
    return true;
  } catch (error) {
    console.error('Error updating note in the database:', error);
    throw error; // You may want to handle the error in a better way based on your application's needs
  }
};


const getNotesWithoutNotebookByUserId = async (userId) => {
  try {
    const query = `
      SELECT *
      FROM notes
      WHERE user_id = $1 AND notebook_id IS NULL;
    `;
    const result = await db.query(query, [userId]);
    return result.rows;
  } catch (error) {
    throw new Error(`Error getting notes without notebook: ${error.message}`);
  }
};

// In your notes.js queries file
const getNotesByNotebookIdAndUserId = async (notebookId, userId) => {
  try {
    const query = `
      SELECT *
      FROM notes
      WHERE user_id = $1 AND notebook_id = $2;
    `;
    const result = await db.query(query, [userId, notebookId]);
    return result.rows;
  } catch (error) {
    throw new Error(`Error getting notes by notebook ID and user ID: ${error.message}`);
  }
};



module.exports = { getNoteById, getNotes, addNewNote, deleteNoteByNoteId, createNote, updateNote, getNotesWithoutNotebookByUserId, getNotesByNotebookIdAndUserId }
