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

module.exports = { alltimes, createTime };
