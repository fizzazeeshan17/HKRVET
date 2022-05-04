const Time = require("../models/Time");

const alltimes = (req, res) => {
  // get all times
  Time.find({}).exec((err, times) => res.json(times));
};

const createTime = async (req, res) => {
  const request = req.body;
  const newTime = new Time({
    time: request.time,
    date: request.date,
    booked: true,
  });

  await newTime.save((err, saved) => {
    Time.findOne({ _id: saved._id }).exec((err, time) => res.json(time));
  });
};

// (exports.findByDate = (req, res) => {
//     const slot_date = req.params.slot_date;
//     console.log("slot date: ", slot_date);

//     //Returns all slot with present date
//     Slot.find({})
//       .where("slot_date")
//       .equals(slot_date)
//       .exec((err, slots) => res.json(slots));
//   });

module.exports = { alltimes, createTime };
