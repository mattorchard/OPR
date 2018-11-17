const jwt = require('jsonwebtoken');

async function isLoggedIn(req, res, next) {
  console.log("Checking if logged in");
  const token = req.headers['x-access-token'];
  if (!token) {
    return res.status(403)
      .send("No token provided.");
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SIGNATURE);
    req.userId = decoded.id;
    return next();
  } catch (error) {
    return res.status(401)
      .send("Failed to authenticate token.");
  }
}

module.exports = {isLoggedIn};