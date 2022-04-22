const express = require("express");
const PORT = process.env.PORT || 3000;
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const signale = require("signale");

dotenv.config();

app.use(express.json());

// app.get("./public/index", (req, res) => {
//   // const html = `<h1>Hello</h1>`;
//   res.send(html);
// });

app.use(express.static("public"));

mongoose.connect(
  process.env.DB_CONNECTION,
  { useNewUrlParser: true, useUnifiedTopology: true },
  (error, db) => {
    if (error) {
      console.log(error);
    } else {
      signale.success("connected successfully to mongoDB");
    }
  }
);

app.listen(PORT, () => {
  signale.success("listening on port " + PORT);
});
