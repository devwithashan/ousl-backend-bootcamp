const express = require("express");
require("dotenv").config();

const mongoose = require("mongoose");

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("MongoDB connected!"));
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

//get all books
app.get("/books", (req, res) => {
  res.json(books);
});

//get a single book
app.get("/books/:id", (req, res) => {
  const book = books.find((b) => b.id == Number(req.params.id));
  //if book doesn't exists
  if (!book) return res.status(404).json({ error: "Book not found!" });
  res.json(book);
});

app.listen(port, () => {
  console.log(`Server running at ${port}`);
});
