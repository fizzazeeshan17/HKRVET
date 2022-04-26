const express = require("express");
const router = express.Router();

const {
  getBookings,
  getBookingById,
  addBooking,
  editBooking,
  removeBooking,
} = require("../controllers/bookingController");

router.get("/", getBookings);
router.get("/:id", getBookingById);
router.post("/create", addBooking);
router.put("/update/:id", editBooking);
router.delete("/:d", removeBooking);

module.exports = router;
