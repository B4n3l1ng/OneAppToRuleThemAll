const express = require("express");
const router = express.Router();
const Character = require("../models/Character.model");

router.get("/characters", async (req, res) => {
  const currentUser = req.session.user;
  const characters = await Character.find({ owner: currentUser });
  console.log(characters);
  res.render("profileViews/characters", { characters });
});

router.get("/characters/new", (req, res) => {
  res.render("profileViews/newCharacter");
});

router.get("/characters/:Id/details", async (req, res) => {
  const character = await Character.findById(req.params.Id);
  res.render("profileViews/characterDetails", { character });
});

router.post("/characters/new", async (req, res) => {
  const charName = req.body.name;
  if (await Character.findOne({ name: charName })) {
    const errorMessage = "Name is already in use";
    res.render("characters/new", { errorMessage });
  } else {
    const created = await Character.create({
      name: req.body.name,
      species: req.body.species,
      gender: req.body.gender,
      occupation: req.body.occupation,
      allegiance: req.body.allegiance,
      money: 0,
      weapons: req.body.weapons,
      image: "",
      owner: req.session.user,
    });
    res.redirect(`/character/${created.id}/details`);
  }
});


module.exports = router;
