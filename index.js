const express = require("express");
const PORT = process.env.PORT || 3000;
const app = express(); 

app.use(express.json());
 
// app.get("./public/index", (req, res) => {
//   // const html = `<h1>Hello</h1>`;
//   res.send(html);
// });

app.use(express.static('public'));

app.listen(PORT, () => {
    console.log("listening on port 3000"); 
  });







  