const db = require('../connection')

const getUserById = (userId) => {
  return db.query('SELECT * FROM users WHERE id = $1;', [userId])
    .then(data => {
      return data.rows[0]; // Since we're fetching a single user, we return the first row
    });
};

module.exports = { getUserById };
