const express = require("express");
require("dotenv").config();

const app = express();

const port = process.env.PORT || 3000;

const booksRouter = require('./routes/books')

app.use(express.json());

app.use('/main', booksRouter);

app.listen(port, () => {
  console.log(`Server running at ${port}`);
});
