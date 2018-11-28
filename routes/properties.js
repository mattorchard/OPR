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

router.get('/', hasRole("owner"), async function(req, res) {
  try {
    const properties = await Property.find({ownerId: req.user._id});
    res.json(properties.map(p => p.toObject()));
  } catch (error) {
    console.error("Unable to fetch owner's properties", error);
    return res.status(500).send("Unable to find property");
  }
});

router.delete("/:propertyId", hasRole("owner"), async function(req, res) {
  const propertyId = req.params.propertyId;
  if (!propertyId) {
    return res.status(404).send("No ID supplied for property deletion");
  }
  try {
    const property = await Property.findById(propertyId);
    if (!property.ownerId.equals(req.user._id)) {
      console.log("ASD", property.ownerId, req.user._id);
      return res.status(403).send("You cannot delete a property that you do not own");
    }
    property.deletedOn = Date.now();
    property.save();
    return res.send("Property deleted")
  } catch (error) {
    console.error("Unable to delete property", error);
    return res.status(500).send("Unable to delete property");
  }
});

module.exports = router;