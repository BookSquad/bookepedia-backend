
const express = require("express");
const router = express.Router();
const User = require("../models/user")

//Creating one student
router.post("/register/", async (req, res) => {
    const user = new User({  
      
      fname: req.body.fname,
      lname: req.body.lname,
      email: req.body.email,
      password: req.body.password

    });
    console.log(user)
    try {
      const newUser = await user.save();
      res.status(201).json(newUser);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });

  module.exports = router;