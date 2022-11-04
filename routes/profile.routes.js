const express = require("express");
const router = express.Router();
const Shop = require("../models/Shop.model");
const User = require("../models/User.model");

router.get("/:username/shop", async (req, res) => {
  try {
    const currentUser = req.session.user
    const shopItems = await Shop.find();
    res.render("profileViews/shop", { shopItems, currentUser });
  } catch (error) {
    console.log(error);
  }
});

router.post("/shop/:id", async (req, res) => {
    try {
    const { id } = req.params
    const currentUser = req.session.user
    await User.findByIdAndUpdate(currentUser._id, {$push:{basket: id}} )
    res.redirect(`/${currentUser.username}/basket`)
    } catch(error) {
        console.log(error)
    }
})

router.get("/:username/basket", async (req, res) => {
    try{
    const currentUser = req.session.user
   const currentUserObj = await User.findById(currentUser._id).populate("basket")
   const currentUserBasket = currentUserObj.basket
    res.render("profileViews/basket", { currentUserBasket, currentUser })
   } catch(error) {
    console.log(error)
   }      
})



router.get("/:username/inventory", (req, res) => {
  res.render("profileViews/inventory");
});

router.get("/explore", (req, res) => {
  res.render("profileViews/explore");
});

router.get("/:username/wealth", async (req, res) => {
  const currentUser = await User.findOne({ username: req.params.username });
  res.render("profileViews/wealth", { currentUser });
});

router.get("/:username/dealer", async (req, res) => {
  const currentUser = await User.findOne({ username: req.params.username });
  res.render("profileViews/dealer", { currentUser, result: "undefined" });
});

router.get("/:username/dealer/dice", async (req, res) => {
  try {
    let currentUser = await User.findOne({ username: req.params.username });
    const cash = currentUser.money;
    const playerDiceResult = Math.floor(Math.random() * (6 - 1 + 1) + 1);
    const dealerDiceResult = Math.floor(Math.random() * (6 - 1 + 1) + 1);
    if (playerDiceResult > dealerDiceResult) {
      const result = "player";
      await User.findOneAndUpdate(
        { username: req.params.username },
        { money: cash + 100 }
      );
      currentUser = await User.findOne({ username: req.params.username });
      res.render("profileViews/dealer", { currentUser, result });
    } else if (dealerDiceResult > playerDiceResult) {
      const result = "dealer";
      currentUser = await User.findOne({ username: req.params.username });
      res.render("profileViews/dealer", { currentUser, result });
    } else if (playerDiceResult === dealerDiceResult) {
      const result = "draw";
      currentUser = await User.findOne({ username: req.params.username });
      res.render("profileViews/dealer", { currentUser, result });
    }
  } catch (error) {
    console.log(error);
  }
});
module.exports = router;
