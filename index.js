const express = require("express");
require('dotenv').config();

const app = express();

const port = process.env.PORT || 3000;

app.use(express.json());

const books = [
  { id: 1, title: "Atomic Habits" },
  { id: 2, title: "Think Like a Monk" },
];

//health
app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

//simple get
app.get("/", (req, res) => {
  res.send("Hello World!");
});

//books
app.get("/books", (req, res) => {
  res.json(books);
});

app.listen(port, () => {
  console.log(`Server running at ${port}`);
});
