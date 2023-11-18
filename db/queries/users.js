const db = require('../connection')

const getUserById = (userId) => {
  return db.query('SELECT * FROM users WHERE id = $1;', [userId])
    .then(data => {
      return data.rows[0]; // Since we're fetching a single user, we return the first row
    });
};

const addUser = (email, pasword, username) => {
  return db.query('INSERT INTO users (email, password, username) VALUES ($1, $2, $3) RETURNING *;', [email, password, username])
  .then(data => {
    return data.rows[0];
  });
};

module.exports = { getUserById, addUser };
