const { alltimes, createTime } = require("../controllers/timeController");
const express = require("express");
const router = express.Router();

router.get("/", alltimes);
router.post("/create", createTime);

module.exports = router;
