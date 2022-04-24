const router = require("express").Router();
<<<<<<< HEAD
const verify = require("./tokenVerification");

router.get("/", verify, (req, res) => {
  res.redirect("/index");
});

=======
const verify = require("./verifyToken");

router.get("/", verify, (req, res) => {
  res.redirect("/batcave");
});
>>>>>>> 1548641dc70edcb3c3d6a8faf118ddd0d759cbdb
module.exports = router;
