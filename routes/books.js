const express = require("express");
const router = express.Router();
const Book = require("../repositories/bookRepository");

//health
router.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

//simple get
router.get("/", (req, res) => {
  res.send("Hello World!");
});

//get all books
router.get("/books", async (req, res) => {
  const book = await Book.findAll();
  res.json(book);
});

//get a single book
router.get("/books/:id", async (req, res) => {
  const book = await Book.findById(req.params.id);
  //if book doesn't exists
  if (!book) return res.status(404).json({ error: "Book not found!" });
  res.json(book);
});

//create a book
router.post("/books", async (req, res) => {
  const { title, author } = req.body ?? {};
  if (!title) return res.status(400).json({ error: "Title is required" });
  try {
    const book = await Book.create({ title, author });
    res.status(201).json(book);
  } catch (e) {
    console.log("Error " + e);
  }
});

//delete a book
router.delete("/delete/:id", async (req, res) => {
  const book = await Book.delete(req.params.id);
  if (!book) return res.status(404).json({ error: "Book not found!" });
  res.json(book);
});

//update a book
router.patch("/update/:id", async (req, res)=>{
  const book = await Book.update(req.params.id, req.body);
  res.json(book);
})

module.exports = router;
