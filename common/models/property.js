const mongoose = require('mongoose');
const {availableLocations} = require("../constants");
const ObjectId = mongoose.Schema.Types.ObjectId;

const AddressSchema = new mongoose.Schema({
  country: {
    type: String,
    required: true
  },
  provinceOrState: {
    type: String,
    required: true
  },
  postalCode: {
    type: String,
    required: true
  },
  streetName: {
    type: String,
    required: true
  },
  streetNumber: {
    type: Number,
    required: true
  },
  unitNumber: {
    type: Number
  }
});

// Todo: Add photos
// Todo: Add wait list
const PropertySchema = new mongoose.Schema({
  address: {
    type: AddressSchema,
    required: true
  },
  type: {
    type: String,
    required: true,
    validate: {
      validator: type => ["house", "apartment"].includes(type),
      message: 'Must be [house] or [apartment]'
    }
  },
  location: {
    type: String,
    required: true,
    validate: {
      validator: location => availableLocations.includes(location),
      message: 'Must be [house] or [apartment]'
    }
  },
  ownerId: {
    type: ObjectId,
    required: true
  },
  bedrooms: {
    type: Number,
    required: true,
    min: 0
  },
  bathrooms: {
    type: Number,
    required: true,
    min: 0
  },
  otherRooms: {
    type: Number,
    required: true,
    min: 0
  },
  rent: {
    type: Number,
    required: true,
    min: 0
  },
  createdOn: {
    type: Date,
    required: true,
  },
  deletedOn: {
    type: Date
  }
});


const Property = mongoose.model('Property', PropertySchema);
module.exports = {Property};