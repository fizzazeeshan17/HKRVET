const router = require("express").Router();
const User = require("../models/User");
const { registerValidation, loginValidation } = require("../validation");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const signale = require("signale");
const secret = "abcd54321";
const jwt_decode = require("jwt-decode");

router.post("/register", async (req, res) => {
  // Validate User
  const { error } = registerValidation(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  // if existing user
  const emailExist = await User.findOne({ email: req.body.email });

  if (emailExist) {
    return res.status(400).json({ error: "Email exists" });
  }

  // Hash Password
  const salt = await bcrypt.genSalt(10);
  const hashPssword = await bcrypt.hash(req.body.password, salt);

  // Create new User
  const user = new User({
    email: req.body.email,
    password: hashPssword,
  });

  try {
    const savedUser = await user.save();
    const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
    res.json({ user: user._id, redirect: "batcave", token });
  } catch (err) {
    res.status(400).json(err);
  }
});

router.post("/login", async (req, res) => {
  // Validate User
  const { error } = loginValidation(req.body);
  signale.success("inside login");
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  //UNCOMMENT LINE 53-72 TO RUN GRADE 4 PART. Then you can see the login part after entering fizza@gmail.com as email and abc123 as password and you can see the payload data in the console.

  // const creds ={
  //   email: "fizza@gmail.com",
  //   password: "abc123",
  // };

  // if (req.body.email === creds.email && req.body.password === creds.password) {
  //   res.status(200).json({
  //     status: "success",
  //     token2: jwt.sign({ name: "Fizza", favColor: "Lavender" }, secret),
  //     redirect: "batcave",
  //   });

  //   var token2 =
  //     "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiRml6emEiLCJmYXZDb2xvciI6IkxhdmVuZGVyIiwiaWF0IjoxNjQ2OTQ4NDM2fQ.495QRC1IZm9DR6hnAgYAzCbPIN3FaBEu2PYfStRsjGg";
  //   var decoded = jwt_decode(token2);

  //   console.log(decoded);
  //      } else {
  //        return res.status(400).json({ error: "failure" });
  // }

  // if existing email
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return res.status(400).json({ error: "Email is not found" });
  }

  // Password correct?
  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) {
    return res.status(400).json({ error: "Invalid password" });
  }

  // Create and assign token to frontend
  const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
  res.header("auth-token", token).json({ token: token, redirect: "batcave" });

  
});
function MyError() {
  Error.captureStackTrace(this, MyError);
}

new MyError().stack;

module.exports = router;
