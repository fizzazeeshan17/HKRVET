import mongoose from "mongoose";

const vetSchema = mongoose.Schema({
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

const Vet = mongoose.model("Vet", vetSchema);
export default Vet;
