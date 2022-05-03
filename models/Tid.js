const { date } = require("@hapi/joi/lib/template");
const mongoose = require("mongoose");
const mongooseDateFormat = require("mongoose-date-format");

const tidSchema = mongoose.Schema({
  pet: {
    type: String,
    required: true,
  },

  reason: {
    type: String,
    required: true,
  },

  fullName: {
    type: String,
    required: true,
  },

  time: {
    type: Date,
    required: true,
    default: new Date(),
  },
});

tidSchema.plugin(mongooseDateFormat);
module.exports = mongoose.model("Tid", tidSchema);
