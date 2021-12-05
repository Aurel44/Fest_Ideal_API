const express = require("express");
const router = express.Router();
const verify = require ('./verifyToken')
const Band = require("../models/Band");

//All the bands
router.get("/", verify, async (req, res) => {
  try {
    const bands = await Band.find();
    res.json(bands);
  } catch (err) {
    res.json({ Message: err });
  }
});

//Submit a band
router.post("/", async (req, res) => {
  const post = new Band({
    name: req.body.name,
    music_style: req.body.music_style,
  });
  try {
    const savedBand = await Band.add(post);
    res.json(savedBand);
  } catch (err) {
    res.json({ Message: err });
  }
});

//Call a specific band
router.get("/:name", async (req, res) => {
  try {
    const band = await Band.findByName(req.params.name);
    res.json(band);
  } catch (err) {
    res.json({ Message: err });
  }
});

//Delete a specific band
router.delete("/:name", async (req, res) => {
  try {
    const band = await Band.deleteOne({ name: req.params.name });
    res.json(band);
  } catch (err) {
    res.json({ Message: err });
  }
});

//Update a specific band
router.patch("/:name", async (req, res) => {
  try {
    const band = await Band.updateOne(
      { name: req.params.name },
      { $set: { name: req.body.name,music_style: req.body.music_style } }
    );
    res.json(band);
  } catch (err) {
    res.json({ Message: err });
  }
});

module.exports = router;
