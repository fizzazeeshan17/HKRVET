const mongoose = require("mongoose");

const timeSchema = mongoose.Schema({
  date: { type: String, required: true },
  time: { type: String, required: true },
  booked: { type: Boolean, default: false },
});

module.exports = mongoose.model("Time", timeSchema);
