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

module.exports = {isLoggedIn};