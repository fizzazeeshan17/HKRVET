import mongoose from "mongoose";

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

const Tid = mongoose.model("Tid", tidSchema);
export default Tid;
