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
  try {
    const { id } = req.params;
    const currentUser = req.session.user;
    const currentUserObj = await User.findById(currentUser._id).populate("basket")
    const currentUserBasket = currentUserObj.basket;
    let totalBasket = 0
    currentUserBasket.forEach((item) => {
      const itemPrice = item.price;
      totalBasket += itemPrice
    })
    const selectedItem = await Shop.findById(id)
    const selectedItemPrice = selectedItem.price
    console.log(selectedItemPrice)
    if ((totalBasket + selectedItemPrice) > currentUserObj.money) {
      const shopItems = await Shop.find();
      res.render("profileViews/shop", {shopItems, errorMessage:"You do not have enough Castar to buy that item, dear traveller. Perhaps you should go and see the dealer..."})
    } else {
    await User.findByIdAndUpdate(currentUser._id, { $push: { basket: id } });
    res.redirect("/profile/basket");
    }
  } catch (error) {
    console.log(error);
  }
});

router.get("/basket", async (req, res) => {
  try {
    const currentUser = req.session.user;
    const currentUserObj = await User.findById(currentUser._id).populate(
      "basket"
    );
    const currentUserBasket = currentUserObj.basket;
    let totalBasket = 0
    currentUserBasket.forEach((item) => {
      const itemPrice = item.price;
      totalBasket += itemPrice
    })
    res.render("profileViews/basket", { currentUserBasket, currentUser, totalBasket });
  } catch (error) {
    console.log(error);
  }
});

router.post("/checkout", async (req, res) => {
  try {
    const currentUser = req.session.user;
    const currentUserObj = await User.findById(currentUser._id).populate(
      "basket"
    );
    const currentUserBasket = currentUserObj.basket;
    await User.findByIdAndUpdate(currentUser._id, { $push: { inventory: currentUserBasket } });
    let counter = 0;
    currentUserBasket.forEach((item) => {
      const itemPrice = item.price;
      counter += itemPrice;
    });
    const currentUserObj2 = await User.findById(currentUser._id);
    const cash = currentUserObj2.money;
    const updatedUser = await User.findByIdAndUpdate(
      currentUser._id,
      { money: cash - counter },
      { new: true }
    );
    await User.findByIdAndUpdate(currentUser._id, { $set: { basket: [] } });
    res.render("profileViews/checkout", { amount: counter, updatedUser });
    counter = 0;
  } catch (error) {
    console.log(error);
  }
});

router.get("/inventory", async (req, res) => {
  try {
  const currentUser = req.session.user;
  const currentUserObj = await User.findById(currentUser._id).populate(
    "inventory"
  );
  const currentUserInv = currentUserObj.inventory
  res.render("profileViews/inventory", {currentUserInv});
  } catch (error) {
    console.log(error)
  }
});

router.get("/explore", (req, res) => {
  res.render("profileViews/explore");
});

router.get("/explore/Gandalf", (req, res) => {
  res.render("exploreViews/gandalf");
});
router.get("/explore/Aragorn", (req, res) => {
  res.render("exploreViews/aragorn");
});

router.get("/explore/Legolas", (req, res) => {
  res.render("exploreViews/legolas");
});

router.get("/explore/Gimli", (req, res) => {
  res.render("exploreViews/gimli");
});

router.get("/wealth", async (req, res) => {
  const currentUser = req.session.user;
  const user = await User.findById(currentUser._id);
  res.render("profileViews/wealth", { user });
});

router.get("/dealer", async (req, res) => {
  const currentUser = req.session.user;
  const user = await User.findById(currentUser._id);
  res.render("profileViews/dealer", { user, result: "undefined" });
});

router.get("/dealer/dice", async (req, res) => {
  try {
    const currentUser = req.session.user;
    const userObj = await User.findById(currentUser._id);
    const cash = userObj.money;
    const playerDiceResult = Math.floor(Math.random() * (6 - 1 + 1) + 1);
    const dealerDiceResult = Math.floor(Math.random() * (6 - 1 + 1) + 1);
    if (playerDiceResult > dealerDiceResult) {
      const result = "player";
      await User.findByIdAndUpdate(
        currentUser._id,
        { money: cash + 100 },
        { new: true }
      );
      const user = await User.findById(currentUser._id);
      res.render("profileViews/dealer", { user, result });
    } else if (dealerDiceResult > playerDiceResult) {
      const result = "dealer";
      const user = await User.findById(currentUser._id);
      res.render("profileViews/dealer", { user, result });
    } else if (playerDiceResult === dealerDiceResult) {
      const result = "draw";
      const user = await User.findById(currentUser._id);
      res.render("profileViews/dealer", { user, result });
    }
  } catch (error) {
    console.log(error);
  }
});
module.exports = router;
