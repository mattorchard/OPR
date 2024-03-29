const mongoose = require('mongoose');
const {availableLocations} = require("../constants");
const ObjectId = mongoose.Schema.Types.ObjectId;

const validatePostalCode = val =>
  /(^[0-9]{5}(-[0-9]{4})?$)|(^[A-z][0-9][A-z][ -]?[0-9][A-z][0-9]$)/.test(val);

const AddressSchema = new mongoose.Schema({
  country: {
    type: String,
    required: true,
    trim: true
  },
  provinceOrState: {
    type: String,
    required: true,
    trim: true
  },
  city: {
    type: String,
    required: true,
    trim: true
  },
  postalCode: {
    type: String,
    required: true,
    validate: [validatePostalCode, "Postal code must be a valid Canadian or American postal code"]
  },
  streetName: {
    type: String,
    required: true,
    trim: true
  },
  streetNumber: {
    type: Number,
    required: true
  },
  unitNumber: {
    type: Number
  }
});

const PropertySchema = new mongoose.Schema({
  photoIds: {
    type: [ObjectId],
    required: true,
    validate: [val => val.length === 5, "{PATH} must contain 5 images"]
  },
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
      message: 'Must be in the list of available locations'
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