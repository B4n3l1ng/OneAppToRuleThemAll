const express = require("express");
const router = express.Router();
const Shop = require("../models/Shop.model");
const User = require("../models/User.model");

router.get("/", (req, res) => {
  res.render("profile", { user: req.session.user });
});

router.get("/shop", async (req, res) => {
  try {
    const currentUser = req.session.user;
    const shopItems = await Shop.find();
    res.render("profileViews/shop", { shopItems, currentUser });
  } catch (error) {
    console.log(error);
  }
});

router.post("/shop/:id", async (req, res) => {
<<<<<<< HEAD
  try {
    const { id } = req.params;
    const currentUser = req.session.user;
    await User.findByIdAndUpdate(currentUser._id, { $push: { basket: id } });
    res.redirect(`/profile/basket`);
  } catch (error) {
    console.log(error);
  }
});
=======
    try {
    const { id } = req.params
    const currentUser = req.session.user
    console.log(id)
    await User.findByIdAndUpdate(currentUser._id, {$push:{basket: id}} )
    res.redirect("/profile/basket")
    } catch(error) {
        console.log(error)
    }
})
>>>>>>> master

router.get("/basket", async (req, res) => {
  try {
    const currentUser = req.session.user;
    const currentUserObj = await User.findById(currentUser._id).populate(
      "basket"
    );
    const currentUserBasket = currentUserObj.basket;
    res.render("profileViews/basket", { currentUserBasket, currentUser });
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

router.get("/wealth", async (req, res) => {
  const currentUser = req.session.user;
  res.render("profileViews/wealth", { currentUser });
});

router.get("/dealer", async (req, res) => {
  const currentUser = req.session.user;
  res.render("profileViews/dealer", { currentUser, result: "undefined" });
});

router.get("/dealer/dice", async (req, res) => {
  try {
    let currentUser = req.session.user;
    const cash = currentUser.money;
    const playerDiceResult = Math.floor(Math.random() * (6 - 1 + 1) + 1);
    const dealerDiceResult = Math.floor(Math.random() * (6 - 1 + 1) + 1);
    if (playerDiceResult > dealerDiceResult) {
      const result = "player";
      currentUser = await User.findOneAndUpdate(
        { username: currentUser.username },
        { money: cash + 100 },
        { new: true }
      );
      res.render("profileViews/dealer", { currentUser, result });
    } else if (dealerDiceResult > playerDiceResult) {
      const result = "dealer";
      res.render("profileViews/dealer", { currentUser, result });
    } else if (playerDiceResult === dealerDiceResult) {
      const result = "draw";
      res.render("profileViews/dealer", { currentUser, result });
    }
  } catch (error) {
    console.log(error);
  }
});
module.exports = router;
