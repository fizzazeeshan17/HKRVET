const mongoose = require("mongoose");

const tidSchema = mongoose.Schema(
  {
    pet: {
      type: String,
      required: true,
    },

    reason: {
      type: String,
      required: true,
    },

    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Tid", tidSchema);
