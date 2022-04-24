<<<<<<< HEAD
=======
const bcrypt = require("bcryptjs");
>>>>>>> 1548641dc70edcb3c3d6a8faf118ddd0d759cbdb
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
    max: 255,
    min: 6,
  },
  password: {
    type: String,
    required: true,
    max: 1024,
    min: 6,
  },
});

<<<<<<< HEAD
module.exports = mongoose.model("User", userSchema);
=======
const User = mongoose.model("User", userSchema);

>>>>>>> 1548641dc70edcb3c3d6a8faf118ddd0d759cbdb
