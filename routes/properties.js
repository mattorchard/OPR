const express = require('express');
const {Property} = require('../common/models/property');
const router = express.Router();
const {hasRole} = require("../custom_middleware/authorization");
const {availableLocations} = require("../common/constants");

// PropertiesController
// This Router is the implementation of the PropertiesController

// addProperty
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

// getPropertiesByOwner
router.get('/', hasRole("owner"), async function(req, res) {
  try {
    const properties = await Property.find({ownerId: req.user._id});
    res.json(properties.map(p => p.toObject()));
  } catch (error) {
    console.error("Unable to fetch owner's properties", error);
    return res.status(500).send("Unable to find property");
  }
});

// deleteProperty
router.delete("/:propertyId", hasRole("owner"), async function(req, res) {
  const propertyId = req.params.propertyId;
  if (!propertyId) {
    return res.status(404).send("No ID supplied for property deletion");
  }
  try {
    const property = await Property.findById(propertyId);
    if (!property.ownerId.equals(req.user._id)) {
      return res.status(403).send("You cannot delete a property that you do not own");
    } else if (property.deletedOn) {
      return res.status(409).send("Property is already deleted");
    }
    property.deletedOn = Date.now();
    property.save();
    return res.send("Property deleted")
  } catch (error) {
    console.error("Unable to delete property", error);
    return res.status(500).send("Unable to delete property");
  }
});

// updateProperty
router.patch("/:propertyId", hasRole("owner"), async function(req, res) {
  const propertyId = req.params.propertyId;
  if (!propertyId) {
    return res.status(404).send("No ID supplied for property update");
  }
  try {
    const property = await Property.findById(propertyId);
    if (!property.ownerId.equals(req.user._id)) {
      return res.status(403).send("You cannot update a property that you do not own");
    } else if (property.deletedOn) {
      return res.status(409).send("Cannot update a property that has been deleted");
    }
    const {rent, bathrooms, bedrooms, otherRooms, photoIds} = req.body;
    property.rent = rent;
    property.bathrooms = bathrooms;
    property.bedrooms = bedrooms;
    property.otherRooms = otherRooms;
    property.photoIds = photoIds;
    const updatedProperty = await property.save();
    return res.json(updatedProperty);
  } catch (error) {
    if (error.name === "ValidationError") {
      return res.status(412).send(error.message);
    } else {
      console.error("Unable to update property", error);
      return res.status(500).send("Unable to update property");
    }
  }
});

// browsePropertiesByLocation
router.get("/browse/:location", async function(req, res) {
  const location = req.params.location;
  if (!availableLocations.includes(location)) {
    return res.status(404).send(`Location not found. Must be one of [${availableLocations}]`)
  }
  try {
    const properties = await Property.find({location, deletedOn: null});
    console.log(`Found ${properties.length} properties`);
    return res.json(properties.map(property => property.toObject()));
  } catch (error) {
    console.error("Unable to fetch properties", error);
    return res.status(500).send("Unable to fetch properties");
  }
});

// searchProperties
router.post("/search", async function(req, res) {
  const {bedrooms, bathrooms, otherRooms, maximumRent, minimumRent, locations, type} = req.body;
  const query = {};
  if (bedrooms || parseInt(bedrooms) === 0) {
    query.bedrooms = bedrooms;
  }
  if (bathrooms || parseInt(bathrooms) === 0) {
    query.bathrooms = bathrooms;
  }
  if (otherRooms || parseInt(otherRooms) === 0) {
    query.otherRooms = otherRooms;
  }
  if (maximumRent || minimumRent) {
    query.rent = {};
    if (minimumRent) {
      query.rent.$gte = minimumRent;
    }
    if (maximumRent) {
      query.rent.$lte = maximumRent;
    }
  }
  if (locations && locations.length > 0) {
    query.location = {$in: locations};
  }

  if (type) {
    query.type = type;
  }

  if (Object.keys(query).length < 1) {
    return res.status(412).send("Must supply one or more query parameters");
  }

  query.deletedOn = null;

  try {
    const properties = await Property.find(query);
    console.log(`Found ${properties.length} properties`);
    return res.json(properties.map(property => property.toObject()));
  } catch (error) {
    console.error("Unable to fetch properties", error);
    return res.status(500).send("Unable to fetch properties");
  }
});

module.exports = router;