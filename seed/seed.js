const Shop = require("../models/Shop.model");
require("../db");

const shopItems = [
    {
        name: "Strength Potion",
        price: 30,
        image: ""
    },
    {
        name: "Healing Potion",
        price: 50,
        image: ""
    },
    {
        name: "Mithril",
        price: 200,
        image: ""
    },
    {
        name: "Lembas Bread",
        price: 10,
        image: ""
    },
    {
        name: "Travelling Cloak",
        price: 40,
        image: ""
    },
    {
        name: "Canoe & Oar",
        price: 100,
        image: ""
    },
    {
        name: "Elden Ring Bow",
        price: 150,
        image: ""
    },
    {
        name: "Giant Slayer",
        price: 150,
        image: ""
    },
    {
        name: "Goblin Slayer",
        price: 150,
        image: ""
    },
    {
        name: "Staff of Power",
        price: 150,
        image: ""
    },
    {
        name: "Berserker Axe",
        price: 150,
        image: ""
    }
];


const addNewShopItems = async () => {
    try {      
    let newShopItems = await Shop.insertMany(shopItems);
 console.log(newShopItems)
} catch(err) {
    console.log(err)
}
}

addNewShopItems();
