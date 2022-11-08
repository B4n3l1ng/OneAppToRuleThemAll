const express = require("express");
const router = express.Router();
const Character = require("../models/Character.model");
const isLoggedIn = require("../middleware/routes");

router.get("/", isLoggedIn, async (req, res) => {
  try {
    const currentUser = req.session.user;
    const characters = await Character.find({ owner: currentUser });
    console.log(characters);
    res.render("profileViews/characters", { characters });
  } catch (error) {
    console.log(error);
  }
});

router.get("/new", (req, res) => {
  res.render("profileViews/newCharacter");
});

router.get("/:Id/", isLoggedIn, async (req, res) => {
  try {
    const character = await Character.findById(req.params.Id);
    res.render("profileViews/characterDetails", { character });
  } catch (error) {
    console.log(error);
  }
});

router.post("/new", isLoggedIn, async (req, res) => {
  try {
    const charName = req.body.name;
    let imgUrl;
    if (req.body.species === "Human" && req.body.gender === "Male") {
      imgUrl = "/images/male_human.png";
    } else if (req.body.species === "Human" && req.body.gender === "Female") {
      imgUrl = "/images/female_human.png";
    } else if (req.body.species === "Dwarf" && req.body.gender === "Male") {
      imgUrl = "/images/male_dwarf.png";
    } else if (req.body.species === "Dwarf" && req.body.gender === "Female") {
      imgUrl = "/images/female_dwarf.png";
    } else if (req.body.species === "Elf" && req.body.gender === "Male") {
      imgUrl = "/images/male_elf.png";
    } else if (req.body.species === "Elf" && req.body.gender === "Female") {
      imgUrl = "/images/female_elf.png";
    } else if (req.body.species === "Orc" && req.body.gender === "Male") {
      imgUrl = "/images/male_orc.png";
    } else if (req.body.species === "Orc" && req.body.gender === "Female") {
      imgUrl = "/images/female_orc.png";
    } else if (req.body.species === "Ent") {
      imgUrl = "/images/ent.png";
    } else if (req.body.species === "Wizard" && req.body.gender === "Male") {
      imgUrl = "/images/male_wizard.png";
    } else if (req.body.species === "Wizard" && req.body.gender === "Female") {
      imgUrl = "/images/female_wizard.png";
    } else if (req.body.species === "Hobbit" && req.body.gender === "Male") {
      imgUrl = "/images/male_hobbit.png";
    } else if (req.body.species === "Hobbit" && req.body.gender === "Female") {
      imgUrl = "/images/female_hobbit.png";
    }
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
        weapons: req.body.weapons,
        image: imgUrl,
        owner: req.session.user,
      });
      res.redirect(`/characters/${created.id}/details`);
    }
  } catch (error) {
    console.log(error);
  }
});
router.get("/:id/details", isLoggedIn, async (req, res) => {
  try {
    const character = await Character.findById(req.params.id);
    res.render("profileViews/characterDetails", { character });
  } catch (error) {
    console.log(error);
  }
});

router.get("/:id/update", isLoggedIn, async (req, res) => {
  try {
    const character = await Character.findById(req.params.id);
    res.render("profileViews/characterUpdate", { character });
  } catch (error) {
    console.log(error);
  }
});

router.post("/:id/update", isLoggedIn, async (req, res) => {
  try {
    await Character.findByIdAndUpdate(req.params.id, {
      name: req.body.name,
      occupation: req.body.occupation,
      allegiance: req.body.allegiance,
    });
    res.redirect(`/${req.params.id}/details`);
  } catch (error) {
    console.log(error);
  }
});

router.get(":id/delete", isLoggedIn, async (req, res) => {
  try {
    const toDelete = await Character.findById(req.params.id);
    res.render("profileViews/characterDelete", { toDelete });
  } catch (error) {
    console.log(error);
  }
});

router.get("/:id/deleteValid", isLoggedIn, async (req, res) => {
  try {
    await Character.findByIdAndDelete(req.params.id);
    res.redirect("/characters");
  } catch (error) {}
});

module.exports = router;
