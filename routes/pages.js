const express = require("express");
const router = express.Router();
const path = require("path");

router.get("/booking", (req, res) => {
  res.sendFile(path.resolve("public/booking.html"));
});

module.exports = router;
