const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

const VisitingListItemSchema = new mongoose.Schema({
  propertyId: {
    type: ObjectId,
    required: true,
  },
  customerId: {
    type: ObjectId,
    required: true
  },
  createdOn: {
    type: Date,
    required: true
  }
});
const VisitingListItem = mongoose.model('VisitingListItem', VisitingListItemSchema);
module.exports = {VisitingListItem};