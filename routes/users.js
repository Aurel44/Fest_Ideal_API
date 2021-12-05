const express = require("express");
const router = express.Router();
const User = require("../models/User");

//All the users
router.get("/", async (req, res) => {
    try {
      const users = await User.find();
      res.json(users);
    } catch (err) {
      res.json({ Message: err });
    }
  });

//Submit a user
router.post("/", async (req, res) => {
  const user = new User({
    firstname: req.body.firstname,
    email: req.body.email,
    password: req.body.password,
  });
  try {
    const savedUser = await user.save();
    res.json(savedUser);
  } catch (err) {
    res.json({ Message: err });
  }
});

//Call a specific user
router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.json(user);
  } catch (err) {
    res.json({ Message: err });
  }
});

//Delete a specific user
router.delete("/:id", async (req, res) => {
  try {
    const user = await User.remove({ _id: req.params.id });
    res.json(user);
  } catch (err) {
    res.json({ Message: err });
  }
});

//Update a specific user
router.patch("/:id", async (req, res) => {
  try {
    const user = await user.updateOne(
      { _id: req.params.id },
      { $set: { title: req.body.title } }
    );
    res.json(post);
  } catch (err) {
    res.json({ Message: err });
  }
});

module.exports = router;
