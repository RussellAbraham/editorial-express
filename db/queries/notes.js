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

const createNote = async (userId, title, body, notebookId = null) => {
  try {
    let query;
    let values;

    if (notebookId) {
      // If notebookId is provided, insert into the specific notebook
      query = {
        text: 'INSERT INTO notes (user_id, title, body, notebook_id, created_at, updated_at) VALUES ($1, $2, $3, $4, NOW(), NOW()) RETURNING *',
        values: [userId, title, body, notebookId],
      };
    } else {
      // If notebookId is not provided, insert into the general notes
      query = {
        text: 'INSERT INTO notes (user_id, title, body, created_at, updated_at) VALUES ($1, $2, $3, NOW(), NOW()) RETURNING *',
        values: [userId, title, body],
      };
    }

    const result = await db.query(query);
    return result.rows[0];
  } catch (error) {
    throw error;
  }
};


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

// Function to update a note in the database
const updateNoteTitle = async (noteId, updatedTitle) => {
  try {
    // Use your database query to update the note
    const query = 'UPDATE notes SET title = $1, updated_at = NOW() WHERE id = $2';
    const values = [updatedTitle, noteId];
    await db.query(query, values);

    // Optionally, you can return the updated note or any other data
    const updatedNote = await getNoteById(noteId);
    return updatedNote;

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

// Function to get notes by notebook ID
const getNotesByNotebookId = async (notebookId) => {
  try {
    const query = {
      text: 'SELECT * FROM notes WHERE notebook_id = $1',
      values: [notebookId],
    };

    const result = await db.query(query);
    return result.rows;
  } catch (error) {
    throw error;
  }
};


module.exports = {
  getNoteById,
  getNotesByNotebookId,
  getNotes,
  addNewNote,
  deleteNoteByNoteId,
  createNote,
  updateNote,
  getNotesWithoutNotebookByUserId,
  getNotesByNotebookIdAndUserId,
  updateNoteTitle
};
