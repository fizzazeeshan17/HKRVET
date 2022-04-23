const express = require("express");
const PORT = process.env.PORT || 3000;
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const pages = require("./routes/pages");
dotenv.config();
const app = express();

app.use(express.json());

// connect to DB
mongoose.connect(
  process.env.DB_CONNECT,
  { useUnifiedTopology: true, useNewUrlParser: true },
  () => {
    console.log("connected to db");
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
