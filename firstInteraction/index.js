console.log("Starting the express web framwork....");
require("dotenv").config();
const express = require("express");

const app = express();
const PORT = process.env.PORT;
const userData = {
  login: "PradeepSahhu",
  id: 94203408,
  node_id: "U_kgDOBZ1uEA",
  avatar_url: "https://avatars.githubusercontent.com/u/94203408?v=4",
  gravatar_id: "",
  url: "https://api.github.com/users/PradeepSahhu",
  html_url: "https://github.com/PradeepSahhu",
  followers_url: "https://api.github.com/users/PradeepSahhu/followers",
  following_url:
    "https://api.github.com/users/PradeepSahhu/following{/other_user}",
  gists_url: "https://api.github.com/users/PradeepSahhu/gists{/gist_id}",
  starred_url:
    "https://api.github.com/users/PradeepSahhu/starred{/owner}{/repo}",
  subscriptions_url: "https://api.github.com/users/PradeepSahhu/subscriptions",
  organizations_url: "https://api.github.com/users/PradeepSahhu/orgs",
  repos_url: "https://api.github.com/users/PradeepSahhu/repos",
  events_url: "https://api.github.com/users/PradeepSahhu/events{/privacy}",
  received_events_url:
    "https://api.github.com/users/PradeepSahhu/received_events",
  type: "User",
  site_admin: false,
  name: "PRADEEP SAHU",
  company: "Student",
  blog: "https://pradeepsahu.in",
  location: "New Delhi, India",
  email: null,
  hireable: null,
  bio: "An Enthusiastic Learner with challenging goals. Has different ways of thinking and abnormal ways of solving problems...",
  twitter_username: "Pradeepsahu__",
  public_repos: 116,
  public_gists: 0,
  followers: 4,
  following: 6,
  created_at: "2021-11-12T23:00:19Z",
  updated_at: "2024-07-18T13:12:05Z",
};

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

app.get("/github", (req, res) => {
  res.json(userData);
});

app.listen(PORT, () => {
  console.log(`The Example is Listening on PORT:${PORT}`);
});
