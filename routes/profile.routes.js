const express = require("express");
const router = express.Router();
const Shop = require("../models/Shop.model");
const User = require("../models/User.model");

router.get("/shop", async (req, res) => {
  try {
    const shopItems = await Shop.find();
    console.log(shopItems);
    res.render("profileViews/shop", { shopItems });
  } catch (error) {
    console.log(error);
  }
});

router.get("/inventory", (req, res) => {
  res.render("profileViews/inventory");
});

router.get("/explore", (req, res) => {
  res.render("profileViews/explore");
});

router.get("/wealth", (req, res) => {
  res.render("profileViews/wealth");
});

router.get("/:userName/dealer", async (req, res) => {
  const currentUser = await User.findOne({ username: req.params.userName });
  res.render("profileViews/dealer", currentUser);
});

router.get("/:userName/dealer/dice", async (req, res) => {
  try {
    const playerDiceResult = Math.floor(Math.random() * (6 - 1 + 1) + 1);
    const dealerDiceResult = Math.floor(Math.random() * (6 - 1 + 1) + 1);
    const currentUser = await User.findOne({ username: req.params.userName });
    const money = currentUser.money;
    let result;
    if (playerDiceResult > dealerDiceResult) {
      result = "player";
      await User.findOneAndUpdate(
        { username: req.params.userName },
        { money: money + 100 }
      );
      res.render("profileViews/dealer", { result });
    } else if (dealerDiceResult > playerDiceResult) {
      result = "dealer";
      res.render("profileViews/dealer", { result });
    } else if (playerDiceResult === dealerDiceResult) {
      result = "draw";
      res.render("profileViews/dealer", { result });
    }
  } catch (error) {
    console.log(error);
  }
});
module.exports = router;
