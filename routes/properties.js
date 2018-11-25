const express = require('express');
const {User, Agent, Owner, Customer} = require('../common/models/User');
const router = express.Router();
const {hasRole, isLoggedIn} = require("../custom_middleware/authorization");

router.post('/', hasRole("owner"), async function(req, res) {

});

module.exports = router;