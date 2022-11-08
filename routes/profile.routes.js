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
    const currentUserObj = await User.findById(currentUser._id).populate(
      "basket"
    );
    const currentUserBasket = currentUserObj.basket;
    let totalBasket = 0;
    currentUserBasket.forEach((item) => {
      const itemPrice = item.price;
      totalBasket += itemPrice;
    });
    const selectedItem = await Shop.findById(id);
    const selectedItemPrice = selectedItem.price;
    if (totalBasket + selectedItemPrice > currentUserObj.money) {
      const shopItems = await Shop.find();
      res.render("profileViews/shop", {
        shopItems,
        errorMessage:
          "You do not have enough Castar to buy that item, dear traveller. Perhaps you should go and see the dealer...",
      });
    } else {
      await User.findByIdAndUpdate(currentUser._id, { $push: { basket: id } });
      res.redirect("/profile/basket");
      }
    }
  catch (error) {
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
    let totalBasket = 0;
    currentUserBasket.forEach((item) => {
      const itemPrice = item.price;
      totalBasket += itemPrice;
    });
    res.render("profileViews/basket", {
      currentUserBasket,
      currentUser,
      totalBasket,
    });
  } catch (error) {
    console.log(error);
  }
});

router.post("/basket/clear", async (req, res) => {
  try {
const currentUser = req.session.user;
await User.findByIdAndUpdate(currentUser._id, { $set: { basket: [] } }); 
      res.redirect("/profile/basket");
    }
  catch (error) {
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
    await User.findByIdAndUpdate(currentUser._id, {
      $push: { inventory: currentUserBasket },
    });
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
    const currentUserInv = currentUserObj.inventory;
    const strengthPotions = []
    const healthPotions = []
    const mithrils = []
    const breads = []
    const cloaks = []
    const canoes = []
    const bows = []
    const longSwords = []
    const shortSwords = []
    const staffs = []
    const axes = []
    currentUserInv.forEach((element) => {
      if(element.name === "Strength Potion") {
        strengthPotions.push(element)
      }
      else if(element.name === "Healing Potion") {
        healthPotions.push(element)
      }
      else if(element.name === "Mithril") {
        mithrils.push(element)
      }
      else if(element.name === "Lembas Bread") {
        breads.push(element)
      }
      else if(element.name === "Travelling Cloak") {
        cloaks.push(element)
      }
      else if(element.name === "Canoe") {
        canoes.push(element)
      }
      else if(element.name === "Elden Ring Bow") {
        bows.push(element)
      }
      else if(element.name === "Giant Slayer") {
        shortSwords.push(element)
      }
      else if(element.name === "Goblin Slayer") {
        longSwords.push(element)
      }
      else if(element.name === "Staff of Power") {
        staffs.push(element)
      }
      else if(element.name === "Berserker Axe") {
        axes.push(element)
      }
    })
    res.render("profileViews/inventory", { currentUserInv, strengthPotions, healthPotions, mithrils, breads, cloaks, canoes, bows, shortSwords, longSwords, staffs, axes });
  } catch (error) {
    console.log(error);
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

router.get("/explore/Frodo", (req, res) => {
  res.render("exploreViews/frodo");
});

router.get("/explore/Sam", (req, res) => {
  res.render("exploreViews/sam");
});

router.get("/explore/Gimli", (req, res) => {
  res.render("exploreViews/gimli");
});

router.get("/explore/MerryPippin", (req, res) => {
  res.render("exploreViews/merryAndPippin");
});

router.get("/explore/Galadriel", (req, res) => {
  res.render("exploreViews/galadriel");
});

router.get("/explore/Elrond", (req, res) => {
  res.render("exploreViews/elrond");
});

router.get("/explore/Gollum", (req, res) => {
  res.render("exploreViews/smeagolGollum");
});

router.get("/explore/Saruman", (req, res) => {
  res.render("exploreViews/saruman");
});

router.get("/explore/Sauron", (req, res) => {
  res.render("exploreViews/sauron");
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
