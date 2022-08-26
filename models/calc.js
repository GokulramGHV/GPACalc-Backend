const mongoose = require('mongoose');

const fieldSchema = new mongoose.Schema({
  subName: String,
  credits: Number,
});

const calcSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  color: String,
  bgColor: String,
  fields: [fieldSchema],
  dateCreated: {
    type: Date,
    required: true,
    default: Date.now,
  },
  createdBy: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('calc', calcSchema);
