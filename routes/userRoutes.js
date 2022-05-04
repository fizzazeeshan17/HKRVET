const router = require("express").Router();
const User = require("../models/user");
const { registerValidation, loginValidation } = require("../validation");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

router.get("/", async (req, res) => {
  try {
    const users = await User.find();

    res.json(users);
  } catch (error) {
    res.status(500).json({ error: "some error" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ error: "No user found" });
    }

    res.json(user);
  } catch (err) {
    res.status(500).json({ error: "Server Error" });
  }
});

router.patch("/:id", async (req, res) => {
  const { phone, email, password } = req.body;

  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { phone, email, password },
      { new: true }
    );

    res.json(user);
  } catch (err) {
    if (err.name === "ValidationError") {
      const messages = Object.values(err.errors).map((val) => val.message);

      return res.status(400).json({ error: messages });
    } else {
      return res.status(500).json({ error: "Server Error" });
    }
  }
});

router.delete("/:id", async (req, res) => {
  try {
    await User.findByIdAndRemove(req.params.id);

    res.json({ message: "User Deleted" });
  } catch (err) {
    res.status(500).json({ error: "Server Error" });
  }
});

router.post("/register", async (req, res) => {
  const { error } = registerValidation(req.body);

  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  const emailExist = await User.findOne({ email: req.body.email });
  if (emailExist) {
    return res.status(400).json({ error: "Email exists" });
  }

  // password hashing
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(req.body.password, salt);

  const user = new User({
    phone: req.body.phone,
    email: req.body.email,
    password: hashPassword,
  });

  try {
    const savedUser = await user.save();
    const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
    // sorry sir but I am a superman fan :)
    res.json({ user: user._id, redirect: "#login", token });
  } catch (err) {
    res.status(400).json(err);
  }
});

router.post("/login", async (req, res) => {
  const { error } = loginValidation(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return res.status(400).json({ error: "Email not found" });
  }

  const validPass = await bcrypt.compare(req.body.password, user.password);
  if (!validPass) {
    return res.status(400).json({ error: "Invalid Password" });
  }

  const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
  res.header("auth_token", token).json({ token, redirect: "booking.html" });
});

module.exports = router;
