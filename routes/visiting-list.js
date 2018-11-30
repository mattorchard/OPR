const express = require('express');
const router = express.Router();
const {hasRole} = require("../custom_middleware/authorization");
const {Property} = require("../common/models/property");
const {VisitingListItem} = require("../common/models/visiting-list-item");

router.post('/:propertyId', hasRole("customer"), async function (req, res) {
  const propertyId = req.params.propertyId;
  if (!propertyId) {
    return res.status(404).send("Must send ID of property to be added");
  }
  try {
    const property = await Property.findById(propertyId);
    if (!property) {
      return res.status(404).send("No property for that ID");
    }
    const existingVisitingListItem = await VisitingListItem.find({propertyId, customerId: req.user._id});
    if (existingVisitingListItem.length > 0) {
      return res.status(409).send("Already on visiting list");
    }
    const visitingListItem = await VisitingListItem.create({
      propertyId,
      customerId: req.user._id,
      createdOn: Date.now()
    });
    return res.json(visitingListItem.toObject());
  } catch (error) {
    console.error("Failed to add to visiting list", error);
    return res.status(500).send("Error trying to add to visiting list");
  }
});

module.exports = router;
