const express = require("express");
const router = express.Router();
const User = require("../models/user");

//Creating one student
router.post("/register/", async (req, res) => {
  const user = new User({
    fname: req.body.fname,
    lname: req.body.lname,
    email: req.body.email,
    password: req.body.password,
    userType: "USER",
  });
  console.log(user);
  try {
    const newUser = await user.save();
    res.status(201).json(newUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

//finding user by email
router.get("/:email", getUser, (req, res) => {
  res.json(res.user);
});

//generic function get user by email
async function getUser(req, res, next) {
  let user;
  try {
    user = await User.findOne({ email: req.params.email });
    if (user == null) {
      return res
        .status(404)
        .json({ message: "Cannot find user " + req.params.email });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.user = user;
  next();
}

module.exports = router;
