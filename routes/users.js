const express = require('express');
const User = require('../common/models/User');
const router = express.Router();
const jwt = require('jsonwebtoken');
const {isLoggedIn} = require("../custom_middleware/authorization");

router.get('/', async function(req, res) {
  const users = await User.find({deletedOn: undefined});
  res.json(users.map(user => user.username));
});

router.post('/', async function(req, res) {
  const {email, username, password} = req.body;
  if (!email || !username || !password) {
    return res.status(412).send("Account must have email, username, and password");
  }
  console.log(`Creating account: ${email}, ${username}`);
  try {
    const createdUser = await User.create({email, username, password});
    console.log("Account created!");
    res.json({id: createdUser._id, username, email});
  } catch (error) {
    console.error("Account not created", error);
  }
});

router.post('/login', async function(req, res) {
  const {username, password} = req.body;
  console.log(`User: ${username} attempting login`);
  try {
    const user = await User.authenticate(username, password);
    const token = jwt.sign({id: user._id}, process.env.JWT_SIGNATURE, {expiresIn: 86400});
    res.json({
      user, token
    });
  } catch(error) {
    console.error(error);
    res.status(401).send("Incorrect username / password")
  }
});

router.get('/me', isLoggedIn, async function(req, res) {
  res.json("Yup, logged in")
});

module.exports = router;
