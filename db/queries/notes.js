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
}

const getNoteById = (noteId) => {
  return db.query('SELECT * FROM notes WHERE id = $1;', [noteId])
  .then(data => {
    return data.rows[0]
  });
}

module.exports = { getNoteById, getNotes, addNewNote }
