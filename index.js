const express = require("express");
const PORT = process.env.PORT || 3000;
const mongoose = require("mongoose");
const dotenv = require("dotenv");
<<<<<<< HEAD
const signale = require("signale");
const userRoute = require("./routes/userRoutes");
const secureRoute = require("./routes/secure");

=======
const pages = require("./routes/pages");
>>>>>>> 1548641dc70edcb3c3d6a8faf118ddd0d759cbdb
dotenv.config();
const app = express();

app.use(express.json());

<<<<<<< HEAD
// app.get("./public/index", (req, res) => {
//   // const html = `<h1>Hello</h1>`;
//   res.send(html);
// });

app.use(express.static("public"));
app.use("/api/user", userRoute);
app.use("/api/secure", secureRoute);

mongoose.connect(
  process.env.DB_CONNECTION,
  { useNewUrlParser: true, useUnifiedTopology: true },
  (error, db) => {
    if (error) {
      console.log(error);
    } else {
      signale.success("connected successfully to mongoose");
    }
=======
// connect to DB
mongoose.connect(
  process.env.DB_CONNECT,
  { useUnifiedTopology: true, useNewUrlParser: true },
  () => {
    console.log("connected to db");
>>>>>>> 1548641dc70edcb3c3d6a8faf118ddd0d759cbdb
  }
);

const authRoute = require("./routes/auth");
const secureRoute = require("./routes/secure");

// Middlewares
app.use(express.json());
app.use(express.static("public"));
// Route Middleware
app.use("/api/user", authRoute);
app.use("/api/secure", secureRoute);
app.use("/", pages);

app.listen(PORT, () => {
  console.log("App running on port" + PORT);
});
