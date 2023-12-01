// Common function to get user ID from cookies
const getUserIdFromCookies = (req) => {
  return req.cookies['user_id'];
};

// Middleware to check if the user is authenticated
const isAuthenticated = (req, res, next) => {
  const userId = getUserIdFromCookies(req);
  if (!userId) {
    return res.redirect('/login');
  }
  next();
};

module.exports = {
  isAuthenticated
};
