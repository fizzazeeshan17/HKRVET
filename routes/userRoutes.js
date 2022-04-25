const router = require("express").Router();
const User = require("../models/User");
const Booking = require("../models/Tid");
const { registerationValidation, loginValidation } = require("../validation");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

router.post("/register", async (req, res) => {
  const { error } = registerationValidation(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  const userExist = await User.findOne({ email: req.body.email });
  if (userExist) {
    const error = new Error("Existing user");
    return res.status(400).json({ msg: error.message });
  }

  const salt = await bcrypt.genSalt(10);
  const hashPssword = await bcrypt.hash(req.body.password, salt);

  const user = new User({
    fullName: req.body.fullName,
    phone: req.body.phone,
    email: req.body.email,
    password: hashPssword,
  });

  try {
    //   const user = new User(req.body);
    const savedUser = await user.save();
    const token = jwt.sign({ _id: user._id }, process.env.SECRET_TOKEN);
    res.json({ user: user._id, redirect: "index", token });
  } catch (error) {
    res.status(400).json(error);
  }
});

router.post("/login", async (req, res) => {
  // Validate User
  const { error } = loginValidation(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  // if existing email
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return res.status(400).json({ error: "No user with such email found" });
  }

  // Password correct?
  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) {
    return res.status(400).json({ error: "Invalid password" });
  }

  // Create and assign token
  const token = jwt.sign({ _id: user._id }, process.env.SECRET_TOKEN);
  res.header("auth-token", token).json({ token: token, redirect: "index" });
});

router.post("/booking-user", async (req, res) => {
  const booking = new Booking(req.body);
  booking.user = req.user._id;

  try {
    const savedBooking = await booking.save();
    res.json(savedBooking);
  } catch (error) {
    console.log(error);
  }
});

router.get("/bookings-user", async (req, res) => {
  const bookings = new Booking.find({ user: req.user._id }).sort({
    $natural: -1,
  });
  res.json(bookings);
});

router.get("/booking-user", async (req, res) => {
  const { _id } = req.params;
  const booking = await Booking.findById(_id);

  if (!booking) {
    const error = new Error("An Error occurred");
    return res.status(400).json({ msg: error.message });
  }
  res.json(booking);
});

router.put("/booking-user/:id", async (req, res) => {
  const { _id } = req.params;
  const { pet, reason } = req.body;
  const booking = await Booking.findById(_id);

  if (!booking) {
    const error = new Error("There was an error");
    return res.status(400).json({ msg: error.message });
  }

  try {
    booking.pet = pet;
    booking.reason = reason;
    await booking.save();
    res.json({ msg: "Booking details updated" });
  } catch (error) {
    console.log(error);
  }
});

router.delete("/booking-user/:id", async (req, res) => {
  const { id } = req.params;
  const booking = await Booking.findById(id);

  if (!booking) {
    const error = new Error("There was an error");
    return res.status(400).json({ msg: error.message });
  }

  try {
    await booking.deleteOne({ _id: id });
    res.json({ msg: "Booking deleted successfully" });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
