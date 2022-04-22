const express = require("express");
const PORT = process.env.PORT || 3000;
const app = express();
const signale = require("signale");

app.use(express.json());

// app.get("./public/index", (req, res) => {
//   // const html = `<h1>Hello</h1>`;
//   res.send(html);
// });

app.use(express.static("public"));

app.listen(PORT, () => {
  signale.success("listening on port " + PORT);
});
