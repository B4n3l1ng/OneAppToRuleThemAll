const express = require("express");
const router = express.Router();
const Shop = require("../models/Shop.model");
const User = require("../models/User.model");

router.get("/:username/shop", async (req, res) => {
  try {
    const shopItems = await Shop.find();
    console.log(shopItems);
    res.render("profileViews/shop", { shopItems });
  } catch (error) {
    console.log(error);
  }
});

router.get("/:username/basket", (req, res) => {
        res.render("profileViews/basket")
})
  


router.get("/:username/inventory", (req, res) => {
  res.render("profileViews/inventory");
});

router.get("/explore", (req, res) => {
  res.render("profileViews/explore");
});

router.get("/:username/wealth", (req, res) => {
  res.render("profileViews/wealth");
});

module.exports = router;
