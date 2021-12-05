const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv/config");
const { registerValidation, loginValidation } = require("../validation");

router.post("/register", async (req, res) => {
  print(req.body);
  const { error } = registerValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  //Checking if existing user
  const emailExist = await User.findOne({ email: req.body.email });
  if (emailExist) return res.status(400).send("Email already exist");

  //hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  //Create a  new user
  const user = new User({
    firstname: req.body.firstname,
    email: req.body.email,
    password: hashedPassword,
  });
  try {
    const savedUser = await user.save();
    res.send((user = user.id));
  } catch (err) {
    res.json({ Message: err });
  }
});

//Login
router.post("/login", async (req, res) => {
  //Validate the datas
  // const { error } = loginValidation(req.body);
  // if (error) return res.status(400).send(error.details[0].message);

  // //Checking if existing user
  // const user = await User.findOne({ email: req.body.email });
  // if (!user) return res.status(400).send("Email or password wrong");

  // //Check if password is correct
  // const validPass = await bcrypt.compare(req.body.password, user.password);
  // if (!validPass) return res.status(400).send("Email or password wrong");

  //Create and asign a tokens
  const token = jwt.sign({ _id: User._id }, process.env.TOKEN_SECRET);
  res.header("auth-token", token).send(token);
});

module.exports = router;
