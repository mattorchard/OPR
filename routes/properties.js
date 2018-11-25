const express = require('express');
const {Property} = require('../common/models/Property');
const router = express.Router();
const {hasRole} = require("../custom_middleware/authorization");


router.post('/', hasRole("owner"), async function(req, res) {
  try {
    const {type, address} = req.body;
    if (type === "apartment" && !address.unitNumber) {
      return res.status(412).send("Apartments must include a unit number");
    }
    const property = await Property.create({
      ...req.body,
      createdOn: Date.now(),
      ownerId: req.user._id
    });
    console.log(`Created address for owner ${req.user.username}`);
    return res.json(property.toObject());
  } catch (error) {
    if (error.name === "ValidationError") {
      return res.status(412).send(error.message);
    } else {
      console.error("Unable to create property", error);
      return res.status(500).send("Unable to create property");
    }
  }
});

module.exports = router;