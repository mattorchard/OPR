const express = require('express');
const {User, Agent, Owner, Customer} = require('../common/models/User');
const router = express.Router();
const jwt = require('jsonwebtoken');
const {isLoggedIn} = require("../custom_middleware/authorization");

const formatUser = user => ({
  id: user._id,
  role: user.__t.toLowerCase(),
  email: user.email,
  username: user.username,
  givenName: user.givenName,
  lastName: user.lastName
});

router.post('/agent', async function(req, res) {
  const {agentKey, email, username, password, givenName, lastName} = req.body;
  if (agentKey !== process.env.AGENT_KEY) {
    return res.status(418).send("Incorrect agent key");
  } else if (!email || !username || !password || !givenName  || !lastName) {
    return res.status(412).send("User must have all fields");
  }
  console.log(`Creating agent: ${email}`);
  try {
    const createdAgent = await Agent.create({createdOn: Date.now(), email, username, password, givenName, lastName});
    console.log("Created agent");
    res.json(formatUser(createdAgent));
  } catch(error) {
    res.status(500).send("Account not created");
    console.error("Account not created", error);
  }
});


// Intended for creating Owners and Customers as an Agent
router.post('/', isLoggedIn, async function(req, res) {
  const {email, username, password, givenName, lastName, maximumRent, role} = req.body;
  if (!email || !username || !password || !givenName  || !lastName) {
    return res.status(412).send("User must have all fields");
  }

  console.log(`Creating account: ${email}`);
  try {
    const userInfo = {createdOn: Date.now(), email, username, password, givenName, lastName};
    let createdUser;
    if (role === "owner") {
      createdUser = await Owner.create(userInfo);
    } else if (role === "customer") {
      if (!maximumRent || maximumRent < 1) {
        return res.status(412).send("Maximum rent must be a positive number");
      }
      createdUser = await Customer.create({...userInfo, maximumRent})
    } else {
      return res.status(412).send("Type must be one of [customer, agent]");
    }
     console.log("Account created!");
    res.json(formatUser(createdUser));
  } catch (error) {
    res.status(500).send("Account not created");
    console.error("Account not created", error);
  }
});

router.post('/login', async function(req, res) {
  const {username, password} = req.body;
  console.log(`User: ${username} attempting login`);
  try {
    const user = await User.authenticate(username, password);
    const token = jwt.sign({id: user.id}, process.env.JWT_SIGNATURE, {expiresIn: 86400});
    res.json({
      user: formatUser(user),
      token
    });
  } catch(error) {
    console.error(error);
    res.status(401).send("Incorrect username / password")
  }
});

router.get('/me', isLoggedIn, async function(req, res) {
  res.json(formatUser(req.user));
});


router.patch('/', isLoggedIn, async function(req, res) {
  const {email, password} = req.body;
  console.log("Foo", email, password);
  if (!email && !password) {
    return res.status(412).send("Nothing to update");
  } else if (email && password) {
    return res.status(412).send("Cannot update password and set email simultaneously");
  }
  if (email) {
    const usersMatchingEmail = await User.find({email});
    if (usersMatchingEmail.length) {
      return res.status(409).send("Email address already in use");
    }
    console.log(`Updating email: ${req.user.email} -> ${email}`);
    await User.updateOne({_id: req.user.id}, {email});
    res.send("User Updated")
  } else if (password) {
    req.user.password = password;
    req.user.save();
    res.send("Password updated");
  }
});

router.delete("/", isLoggedIn, async function(req, res) {
  await User.updateOne({_id: req.user._id}, {deletedOn: Date.now()});
  res.send("Deactivated account");
});

module.exports = router;
