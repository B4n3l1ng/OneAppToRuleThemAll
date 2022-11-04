const express = require("express");
const router = express.Router();
const Character = require("../models/Character.model");

router.get("/characters", async (req, res) => {
  try {
    const currentUser = req.session.user;
    const characters = await Character.find({ owner: currentUser });
    console.log(characters);
    res.render("profileViews/characters", { characters });
  } catch (error) {
    console.log(error);
  }
});

router.get("/characters/new", (req, res) => {
  res.render("profileViews/newCharacter");
});

router.get("/characters/:Id/", async (req, res) => {
  try {
    const character = await Character.findById(req.params.Id);
    res.render("profileViews/characterDetails", { character });
  } catch (error) {
    console.log(error);
  }
});

router.post("/characters/new", async (req, res) => {
  try {
    const charName = req.body.name;
    if (await Character.findOne({ name: charName })) {
      const errorMessage = "Name is already in use";
      res.render("profileViews/newCharacter", { errorMessage });
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
      res.redirect(`/characters/${created.id}/details`);
    }
  } catch (error) {
    console.log(error);
  }
});
router.get("/characters/:id/details", async (req, res) => {
  try {
    const character = await Character.findById(req.params.id);
    res.render("profileViews/characterDetails", { character });
  } catch (error) {
    console.log(error);
  }
});

router.get("/characters/:id/update", async (req, res) => {
  try {
    const character = await Character.findById(req.params.id);
    res.render("profileViews/characterUpdate", { character });
  } catch (error) {
    console.log(error);
  }
});

router.post("/characters/:id/update", async (req, res) => {
  try {
    await Character.findByIdAndUpdate(req.params.id, {
      name: req.body.name,
      occupation: req.body.occupation,
      allegiance: req.body.allegiance,
    });
    res.redirect(`/characters/${req.params.id}/details`);
  } catch (error) {
    console.log(error);
  }
});

router.get("/characters/:id/delete", async (req, res) => {
  try {
    const toDelete = await Character.findById(req.params.id);
    res.render("profileViews/characterDelete", { toDelete });
  } catch (error) {
    console.log(error);
  }
});

router.get("/characters/:id/deleteValid", async (req, res) => {
  try {
    await Character.findByIdAndDelete(req.params.id);
    res.redirect("/characters");
  } catch (error) {}
});

module.exports = router;
