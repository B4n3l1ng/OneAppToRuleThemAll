const Shop = require("../models/Shop.model");
require("../db");

const shopItems = [
  {
    name: "Strength Potion",
    price: 60,
    image: "/images/strength_potion.png"
  },
  {
    name: "Healing Potion",
    price: 80,
    image: "/images/health_potion.png"
  },
  {
    name: "Mithril",
    price: 200,
    image: "/images/mithril.png"
  },
  {
    name: "Lembas Bread",
    price: 10,
    image: "/images/lembas_bread.png",
  },
  {
    name: "Travelling Cloak",
    price: 40,
    image: "/images/travel_cloak.png",
  },
  {
    name: "Canoe",
    price: 100,
    image: "/images/canoe.png",
  },
  {
    name: "Elden Ring Bow",
    price: 150,
    image: "/images/bow.png",
  },
  {
    name: "Giant Slayer",
    price: 150,
    image: "/images/long_sword.png",
  },
  {
    name: "Goblin Slayer",
    price: 150,
    image: "/images/short_sword.png",
  },
  {
    name: "Staff of Power",
    price: 150,
    image: "/images/staff.png",
  },
  {
    name: "Berserker Axe",
    price: 150,
    image: "/images/axe.png",
  },
];

/*const addNewShopItems = async () => {
  try {
    let newShopItems = await Shop.insertMany(shopItems);
    console.log(newShopItems);
  } catch (err) {
    console.log(err);
  }
};

addNewShopItems();*/
