const router = require("express").Router();
const verify = require("./tokenVerification");

router.get("/", verify, (req, res) => {
  res.redirect("/booking");
});

module.exports = router;
