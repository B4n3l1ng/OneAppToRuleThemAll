const express = require("express");
const router = express.Router();
const Shop = require("../models/Shop.model");
const User = require("../models/User.model");

router.get("/:username/shop", async (req, res) => {
  try {
    const currentUser = req.session.user
    const shopItems = await Shop.find();
    console.log(shopItems);
    res.render("profileViews/shop", { shopItems, currentUser });
  } catch (error) {
    console.log(error);
  }
});

router.post("/:username/shop/:id", async (req, res) => {
    try {
        const selectedItem = await Shop.findById(req.params.body)
        console.log(selectedItem);
        res.render("profileViews/basket")
    } catch (error) {
        console.log(error)
    }
})

router.get("/:username/basket", (req, res) => {
    const currentUser = req.session.user
        res.render("profileViews/basket", { currentUser })
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
