const jwt = require('jsonwebtoken');
const {User} = require('../common/models/User');

async function isLoggedIn(req, res, next) {
  console.log("Checking if logged in");
  const token = req.headers['x-access-token'];
  if (!token) {
    return res.status(403)
      .send("No token provided.");
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SIGNATURE);
    req.user = await User.findById(decoded.id);
    if (!req.user) {
      return res.status(401)
        .send("Failed to authenticate token")
    } else if (req.user.deletedOn < Date.now()) {
      return res.status(401)
        .send("Account has been deactivated");
    }
    return next();
  } catch (error) {
    return res.status(401)
      .send("Failed to authenticate token");
  }
}
const hasRole = requiredRole => async (req, res, next) => {
  return isLoggedIn(req, res, async() => {
    const actualRole = req.user && req.user.__t && req.user.__t.toLowerCase();
    if (actualRole === requiredRole.toLowerCase()) {
      return next();
    } else {
      return res.status(403)
        .send(`Cannot perform action. Must be a [${requiredRole}]`)
    }
  });
};
module.exports = {isLoggedIn, hasRole};