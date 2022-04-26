const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  fullName: {
    type: String,
    required: true,
  },

  phone: {
    type: Number,
    required: true,
  },

  email: {
    type: String,
    required: true,
   
  },
  password: {
    type: String,
    required: true,
   
  },
});

module.exports = mongoose.model("User", userSchema)

