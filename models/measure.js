const mongoose = require('mongoose');

const { Schema } = mongoose;

const measureSchema = new Schema(
  {
    ip: {
      type: String,
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
    download: {
      type: Number,
      required: true,
    },
    unit: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model('Measure', measureSchema);
