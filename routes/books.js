const express = require("express");
const router = express.Router();
const Book = require("../models/book.js")

//https://www.sammeechward.com/uploading-images-express-and-react#react
//Used for image uploads to store images in a folder (on the server)
// 1
const multer = require('multer')
// 2
const upload = multer({ dest: './BookImagesUploaded/' })

//Creating one book
router.post("/upload/", upload.single('image'), async (req, res) => {
  console.log("Server made it")
  let fileName = ''
  if (req.file) {
    fileName = req.file.filename
  }
  

  const book = new Book({  
    
    title: req.body.title,
    isbn: req.body.isbn,
    authors: req.body.authors,
    genre: req.body.genre,
    price: req.body.price,
    description: req.body.description,
    sellerEmail: req.body.sellerEmail,
    image: fileName 

  }); 
  console.log(book)  
  try {
    const newBook = await book.save();
    //res.send(newBook)
    //res.send('success')
    res.status(201).json(newBook);
  } catch (err) {
    //res.send("ERROR: " + err.message)
    res.status(400).json({ message: err.message });
  }

});


/*
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
*/

router.delete("/:isbn", getBookByIsbn, async (req, res) => {
  try {
    await res.book.remove();
    console.log(res.book)
    res.json({ message: "Deleted Book" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
  
//finding user by email
router.get("/:isbn", getBookByIsbn, (req, res) => {
  res.json(res.book);
});

//generic function get user by email
async function getBookByIsbn(req, res, next) {
  let book;
  try {
    book = await Book.findOne({ isbn: req.params.isbn });
    if (book == null) {
      return res
        .status(404)
        .json({ message: "Cannot find book isbn " + req.params.isbn });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
  
  res.book = book;
  next();
}

module.exports = router;