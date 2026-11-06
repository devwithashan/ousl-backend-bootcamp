const express = require("express");
const router = express.Router();
const books = require("../data/books");

//health
router.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

//simple get
router.get("/", (req, res) => {
  res.send("Hello World!");
});

//get all books
router.get("/books", (req, res) => {
  res.json(books);
});

//get a single book
router.get("/books/:id", (req, res) => {
  const book = books.find((b) => b.id == Number(req.params.id));
  //if book doesn't exists
  if (!book) return res.status(404).json({ error: "Book not found!" });
  res.json(book);
});

module.exports = router;
