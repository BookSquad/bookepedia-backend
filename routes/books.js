const express = require("express");
const router = express.Router();
const Book = require("../models/book")

//Creating one book
router.post("/upload/", async (req, res) => {
    const book = new Book({  
      
      title: req.body.title,
      isbn: req.body.isbn,
      authors: req.body.authors,
      genre: req.body.genre,
      price: req.body.price,
      description: req.body.description,
      sellerEmail: req.body.sellerEmail,

    });
    console.log(book)
    try {
      const newBook = await book.save();
      res.status(201).json(newBook);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });

  module.exports = router;