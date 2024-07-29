import express from "express";
import { configDotenv } from "dotenv";

const app = express();
const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("hello backend Pradeep... server is ready");
});

// get a list of 5 jokes
// jokes data

const jokes = [
  {
    id: 1,
    title: "joke 1",
    content: "This is joke number 1",
  },
  {
    id: 2,
    title: "joke 2",
    content: "This is joke number 2 and you will love it",
  },
  {
    id: 3,
    title: "joke 3",
    content: "This is joke number 3 and you will not love it ",
  },
  {
    id: 4,
    title: "joke 4",
    content: "This is joke number 4 and you will need rest after reading it",
  },
  {
    id: 5,
    title: "joke 5",
    content:
      "This is joke number 5 and you can't live after reading it and this is it",
  },
];

app.get("/api/jokes", (req, res) => {
  res.send(jokes);
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
