const router = require("express").Router();
const User = require("../models/User");
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
    res.status(201).json(error);
  }
});

router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    // .populate("tids", ["tids"])
    // .sort({ createdAt: -1 });
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

router.put("/:id", async (req, res) => {
  const { fullName, phone, email, password } = req.body;

  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { fullName, phone, email, password },
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

module.exports = router;
