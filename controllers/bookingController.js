const Booking = require("../models/Appointment");
const Time = require("../models/Time");

const getBookings = async (req, res) => {
  try {
    const bookings = await Booking.find().populate("time", ["date", "time"]);
    res.json(bookings);
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while retrieving bookings" });
  }
};

const getBookingById = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res
        .status(404)
        .json({ error: "No booking with such ID was found" });
    }

    res.json(booking);
  } catch (err) {
    res.status(500).json({ error: "Server Error" });
  }
};

const addBooking = async (req, res) => {
  try {
    const newTime = new Time({
      date: req.body.date,
      time: req.body.time,
    });
    const timeExist = await Time.findOne({
      time: req.body.time,
      date: req.body.date,
    });
    if (timeExist) {
      return res.status(400).json({ error: "Time is already booked!" });
    }

    await newTime.save();
    const booking = new Booking({
      pet: req.body.pet,
      reason: req.body.reason,
      fullName: req.body.fullName,
      time: newTime,
    });
    booking.save();

    res.status(201).json(booking);
  } catch (err) {
    if (err.name === "ValidationError") {
      const messages = Object.values(err.errors).map((val) => val.message);

      return res.status(400).json({ error: messages });
    } else {
      return res.status(500).json({ error: "Server Error" });
    }
  }
};

const editBooking = async (req, res) => {
  const { pet, reason, time } = req.body;
  try {
    const booking = await Booking.findByIdAndUpdate(
      req.params.id,
      { pet, reason, fullName, time },
      { new: true }
    );
    res.json(booking);
  } catch (err) {
    if (err.name === "ValidationError") {
      const messages = Object.values(err.errors).map((val) => val.message);

      return res.status(400).json({ error: messages });
    } else {
      return res.status(500).json({ error: "Server Error" });
    }
  }
};

const removeBooking = async (req, res) => {
  try {
    await Booking.findByIdAndRemove(req.params.id);

    res.json({ message: "Booking Deleted" });
  } catch (err) {
    res.status(500).json({ error: "Server Error" });
  }
};

module.exports = {
  getBookings,
  getBookingById,
  addBooking,
  editBooking,
  removeBooking,
};
