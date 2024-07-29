console.log("Starting the express web framwork....");
require("dotenv").config();
const express = require("express");

const app = express();
const PORT = process.env.PORT;

app.get("/", (req, res) => {
  res.send("Hello world");
});

app.get("/twitter", (req, res) => {
  res.send("Hello Twitter");
});

app.get("/chai", (req, res) => {
  res.send("Go to have a chai");
});

app.get("/login", (req, res) => {
  res.send("<h1>Plese Login at pradeepsahu.in</h1>");
});

app.listen(PORT, () => {
  console.log(`The Example is Listening on PORT:${PORT}`);
});
