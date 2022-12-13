const mongoose = require('mongoose');

const photoSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: [true, 'Please provide an id'],
      unique: true,
      minlength: 11,
    },
    description: {
      type: String,
    },
    url: {
      type: String,
      required: [true, 'Please provide a url'],
      unique: true,
    },
    link: {
      type: String,
      required: [true, 'Please provide a link'],
      unique: true,
    },
    topics: {
      type: [String],
    },
    user: {
      type: String,
      required: [true, 'Please provide a user'],
      unique: true,
      minlength: 11,
    },
  },
  {
    toJSON: {
      virtuals: true,
    },
    toObject: {
      virtuals: true,
    },
  }
);

// text index for mongodb text search query
photoSchema.index({ user: 'text', description: 'text', topics: 'text' });

const Photo = mongoose.model('Photo', photoSchema);

module.exports = Photo;