
const express = require("express");

const app = express(); //this means that it creates an instance of Express.

app.get("/api", (req, res) => {
    //rest api has a request to the server and gets a response back
    // '/' means root, if i write /fizza then i need to write localhost:1337/fizza
    // we just created an endpoint here
    const html = `<h1>Hello, cool eh? </h1>`;
    res.send(html);
  }); //endpoint using REST API verbs