const express = require("express");
require("dotenv").config();

const mongoose = require("mongoose");

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("MongoDB connected!"));
const app = express();

const bookRoutes = require("./routes/books");

const port = process.env.PORT || 3000;

app.use(express.json());

const books = [
  { id: 1, title: "Atomic Habits" },
  { id: 2, title: "Think Like a Monk" },
];

app.use("", bookRoutes);

app.listen(port, () => {
  console.log(`Server running at ${port}`);
});
