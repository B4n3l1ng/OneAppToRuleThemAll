const express = require("express");
const router = express.Router();
const Shop = require("../models/Shop.model");
const User = require("../models/User.model");
const isLoggedIn = require("../middleware/routes");
function logChanges(req) {
  if (req.session.user) {
    return true;
  } else {
    return false;
  }
}

router.get("/", isLoggedIn, (req, res) => {
  const user = req.session.user;
  res.render("profile", { user });
});

router.get("/shop", isLoggedIn, async (req, res) => {
  try {
    const currentUser = req.session.user;
    const shopItems = await Shop.find();
    res.render("profileViews/shop", { shopItems, currentUser });
  } catch (error) {
    console.log(error);
  }
});

router.post("/shop/:id", isLoggedIn, async (req, res) => {
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
  } catch (error) {
    console.log(error);
  }
});

router.get("/basket", isLoggedIn, async (req, res) => {
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
    const strengthPotions = [];
    const healthPotions = [];
    const mithrils = [];
    const breads = [];
    const cloaks = [];
    const canoes = [];
    const bows = [];
    const longSwords = [];
    const shortSwords = [];
    const staffs = [];
    const axes = [];
    currentUserBasket.forEach((element) => {
      if (element.name === "Strength Potion") {
        strengthPotions.push(element);
      } else if (element.name === "Healing Potion") {
        healthPotions.push(element);
      } else if (element.name === "Mithril") {
        mithrils.push(element);
      } else if (element.name === "Lembas Bread") {
        breads.push(element);
      } else if (element.name === "Travelling Cloak") {
        cloaks.push(element);
      } else if (element.name === "Canoe") {
        canoes.push(element);
      } else if (element.name === "Elden Ring Bow") {
        bows.push(element);
      } else if (element.name === "Giant Slayer") {
        shortSwords.push(element);
      } else if (element.name === "Goblin Slayer") {
        longSwords.push(element);
      } else if (element.name === "Staff of Power") {
        staffs.push(element);
      } else if (element.name === "Berserker Axe") {
        axes.push(element);
      }
    });
    res.render("profileViews/basket", {
      currentUserBasket,
      currentUser,
      totalBasket,
      strengthPotions,
      healthPotions,
      mithrils,
      breads,
      cloaks,
      canoes,
      bows,
      shortSwords,
      longSwords,
      staffs,
      axes
    });
  } catch (error) {
    console.log(error);
  }
});

router.post("/basket/clear", isLoggedIn, async (req, res) => {
  try {
    const currentUser = req.session.user;
    await User.findByIdAndUpdate(currentUser._id, { $set: { basket: [] } });
    res.redirect("/profile/basket");
  } catch (error) {
    console.log(error);
  }
});

router.post("/basket/:id", isLoggedIn, async (req, res) => {
  try {
const { id } = req.params;
const currentUser = req.session.user;
const currentUserObj = await User.findById(currentUser._id).populate("basket");
const currentUserBasket = currentUserObj.basket;
console.log("BEFORE", currentUserBasket)
for (let i = 0; i < currentUserBasket.length; i++ ) {
  const item = currentUserBasket[i];
  if(item.id === id) {
    const itemToDeleteIndex = currentUserBasket.indexOf(item);
    currentUserBasket.splice(itemToDeleteIndex, 1);
    break;
  }
  else {
    continue;
  }
}
await User.findByIdAndUpdate(currentUser._id, { $set: { basket: [] } });
await User.findByIdAndUpdate(currentUser._id, { $push: { basket: currentUserBasket } });
res.redirect("/profile/basket")
  } catch(error) {
    console.log(error)
  }
})

router.post("/checkout", isLoggedIn, async (req, res) => {
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

router.get("/inventory", isLoggedIn, async (req, res) => {
  try {
    const currentUser = req.session.user;
    const currentUserObj = await User.findById(currentUser._id).populate(
      "inventory"
    );
    const currentUserInv = currentUserObj.inventory;
    const strengthPotions = [];
    const healthPotions = [];
    const mithrils = [];
    const breads = [];
    const cloaks = [];
    const canoes = [];
    const bows = [];
    const longSwords = [];
    const shortSwords = [];
    const staffs = [];
    const axes = [];
    currentUserInv.forEach((element) => {
      if (element.name === "Strength Potion") {
        strengthPotions.push(element);
      } else if (element.name === "Healing Potion") {
        healthPotions.push(element);
      } else if (element.name === "Mithril") {
        mithrils.push(element);
      } else if (element.name === "Lembas Bread") {
        breads.push(element);
      } else if (element.name === "Travelling Cloak") {
        cloaks.push(element);
      } else if (element.name === "Canoe") {
        canoes.push(element);
      } else if (element.name === "Elden Ring Bow") {
        bows.push(element);
      } else if (element.name === "Giant Slayer") {
        shortSwords.push(element);
      } else if (element.name === "Goblin Slayer") {
        longSwords.push(element);
      } else if (element.name === "Staff of Power") {
        staffs.push(element);
      } else if (element.name === "Berserker Axe") {
        axes.push(element);
      }
    });
    res.render("profileViews/inventory", {
      currentUserInv,
      strengthPotions,
      healthPotions,
      mithrils,
      breads,
      cloaks,
      canoes,
      bows,
      shortSwords,
      longSwords,
      staffs,
      axes,
    });
  } catch (error) {
    console.log(error);
  }
});

router.post("/inventory/:id", isLoggedIn, async (req, res) => {
  try {
    let saleAmount = 0;
    const { id } = req.params;
    const currentUser = req.session.user;
    const currentUserObj = await User.findById(currentUser._id).populate("inventory"); 
    const currentUserInv = currentUserObj.inventory
    currentUserInv.forEach((item) => {
     if(item.id === id) {
      saleAmount += item.price
     }
    })
    const cash = currentUserObj.money
  await User.findByIdAndUpdate(currentUser._id, { money: cash + saleAmount})
    await User.findByIdAndUpdate(currentUser._id, { $pull: { inventory: id } })
    res.render("profileViews/sale", {saleAmount})
    }
    catch(error) {
      console.log(error)
    }
  })

router.get("/explore", (req, res) => {
  const change = logChanges(req);
  res.render("profileViews/explore", { change });
});

router.get("/explore/Gandalf", (req, res) => {
  const change = logChanges(req);
  res.render("exploreViews/gandalf", { change });
});
router.get("/explore/Aragorn", (req, res) => {
  const change = logChanges(req);
  res.render("exploreViews/aragorn", { change });
});

router.get("/explore/Legolas", (req, res) => {
  const change = logChanges(req);
  res.render("exploreViews/legolas", { change });
});

router.get("/explore/Frodo", (req, res) => {
  const change = logChanges(req);
  res.render("exploreViews/frodo", { change });
});

router.get("/explore/Sam", (req, res) => {
  const change = logChanges(req);
  res.render("exploreViews/sam", { change });
});

router.get("/explore/Gimli", (req, res) => {
  const change = logChanges(req);
  res.render("exploreViews/gimli", { change });
});

router.get("/explore/MerryPippin", (req, res) => {
  const change = logChanges(req);
  res.render("exploreViews/merryAndPippin", { change });
});

router.get("/explore/Galadriel", (req, res) => {
  const change = logChanges(req);
  res.render("exploreViews/galadriel", { change });
});

router.get("/explore/Elrond", (req, res) => {
  const change = logChanges(req);
  res.render("exploreViews/elrond", { change });
});

router.get("/explore/Gollum", (req, res) => {
  const change = logChanges(req);
  res.render("exploreViews/smeagolGollum", { change });
});

router.get("/explore/Saruman", (req, res) => {
  const change = logChanges(req);
  res.render("exploreViews/saruman", { change });
});

router.get("/explore/Sauron", (req, res) => {
  const change = logChanges(req);
  res.render("exploreViews/sauron", { change });
});

router.get("/explore/Shire", (req, res) => {
  const change = logChanges(req);
  res.render("exploreViews/shire", { change });
});

router.get("/explore/Rivendell", (req, res) => {
  const change = logChanges(req);
  res.render("exploreViews/rivendell", { change });
});

router.get("/explore/Gondor", (req, res) => {
  const change = logChanges(req);
  res.render("exploreViews/gondor", { change });
});

router.get("/explore/Rohan", (req, res) => {
  const change = logChanges(req);
  res.render("exploreViews/rohan", { change });
});

router.get("/explore/Mirkwood", (req, res) => {
  const change = logChanges(req);
  res.render("exploreViews/mirkwood", { change });
});

router.get("/explore/Moria", (req, res) => {
  const change = logChanges(req);
  res.render("exploreViews/moria", { change });
});

router.get("/explore/Isengard", (req, res) => {
  const change = logChanges(req);
  res.render("exploreViews/isengard", { change });
});

router.get("/explore/Doom", (req, res) => {
  const change = logChanges(req);
  res.render("exploreViews/doom", { change });
});

router.get("/explore/Mordor", (req, res) => {
  const change = logChanges(req);
  res.render("exploreViews/onedoesnotsimply", { change });
});

router.get("/explore/Mordor/true", (req, res) => {
  const change = logChanges(req);
  res.render("exploreViews/mordor", { change });
});

router.get("/wealth", isLoggedIn, async (req, res) => {
  const currentUser = req.session.user;
  const user = await User.findById(currentUser._id);
  res.render("profileViews/wealth", { user });
});

router.get("/dealer", isLoggedIn, async (req, res) => {
  const currentUser = req.session.user;
  const user = await User.findById(currentUser._id);
  res.render("profileViews/dealer", { user, result: "undefined" });
});

router.get("/dealer/dice", isLoggedIn, async (req, res) => {
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
