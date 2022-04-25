const express = require("express");
const PORT = process.env.PORT || 3000;
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const signale = require("signale");
const userRoute = require("./routes/userRoutes");
const secureRoute = require("./routes/secure");
const bookingRoute = require("./routes/bookingRoute");

dotenv.config();

app.use(express.json());

// app.get("./public/index", (req, res) => {
//   // const html = `<h1>Hello</h1>`;
//   res.send(html);
// });

app.use(express.static("public"));
app.use("/api/user", userRoute);
app.use("/api/secure", secureRoute);
app.use("/api/booking", bookingRoute);

mongoose.connect(
  process.env.DB_CONNECTION,
  { useNewUrlParser: true, useUnifiedTopology: true },
  (error, db) => {
    if (error) {
      console.log(error);
    } else {
      signale.success("connected successfully to mongoose");
    }
  }
);

app.listen(PORT, () => {
  signale.success("listening on port " + PORT);
});
