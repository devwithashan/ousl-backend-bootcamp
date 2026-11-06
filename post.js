const express = require('express');
require('dotenv').config();

const app = express();

const PORT = process.env.PORT;

app.use(express.json());

const books = [
  { id: 1, title: "Atomic Habits" },
  { id: 2, title: "Think Like a Monk" },
];

//get all books
app.get("/books", (req, res) => {
  res.json(books);
});


app.post('/books', (req, res)=>{
    const {title} = req.body ?? {};
    if(!title) return res.status(400).json({error: 'Title is requires'});
    const book = {
        id: books.length+1,
        title: title// title
    } 
    books.push(book);
    res.status(201).json(book);ß
})

app.listen(PORT, ()=>{
    console.log(`Server running at ${PORT}`);
})