const express = require('express');
const User = require('../common/models/User');
const router = express.Router();



/* GET users listing. */
router.get('/', function(req, res) {
  res.json([{
    id: 1,
    username: "Mert"
  }]);
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
  try {
    const user = await User.authenticate(username, password);
    res.json(user);
  } catch(error) {
    console.error(error);
    res.status(401).send("Incorrect username / password")
  }
});

module.exports = router;
