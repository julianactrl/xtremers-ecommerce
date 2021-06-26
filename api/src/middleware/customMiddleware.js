function isAuthenticated(req, res, next) {
  if (req.user) next();
  else res.sendStatus(401);
}

function isAdmin(req, res, next) {
  if (req.user.isAdmin) next();
  else res.sendStatus(403);
}

module.exports = {
  isAuthenticated,
  isAdmin,
};
