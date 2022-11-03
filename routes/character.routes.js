const express = require("express");
const router = express.Router();
const User = require("../models/User.model");
const Character = require("../models/character.model");

router.get("/characters", async (req, res) => {
  const currentUser = req.session.user;
  const characters = await Character.find({ owner: currentUser });
  console.log(characters);
  res.render("profileViews/characters", { characters });
});

module.exports = router;
