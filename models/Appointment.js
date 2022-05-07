const { required } = require("@hapi/joi/lib/base");
const { date } = require("@hapi/joi/lib/template");
const mongoose = require("mongoose");
const mongooseDateFormat = require("mongoose-date-format");

const appointmentSchema = mongoose.Schema({
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
  
  time:{
    type: mongoose.Types.ObjectId,
    ref: "Time"
    
  },
});

appointmentSchema.plugin(mongooseDateFormat);
module.exports = mongoose.model("Appointment", appointmentSchema);
