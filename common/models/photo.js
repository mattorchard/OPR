const mongoose = require('mongoose');
const Buffer = mongoose.Schema.Types.Buffer;
const ObjectId = mongoose.Schema.Types.ObjectId;

const PhotoSchema = new mongoose.Schema({
  data: {
    type: Buffer,
    required: true
  },
  ownerId: {
    type: ObjectId,
    required: true
  }
});

const Photo = mongoose.model('Photo', PhotoSchema);
module.exports = {Photo};