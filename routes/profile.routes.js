const express = require("express");
const router = express.Router();
const Shop = require("../models/Shop.model");

<<<<<<< HEAD
router.get()



=======
router.get("/shop", async (req, res) => {
    try {
        const shopItems = await Shop.find()
        console.log(shopItems)
        res.render("profileViews/shop", { shopItems })
     } catch (error) {
        console.log(error)
     }
})


router.get("/inventory", (req, res) => {
    res.render("profileViews/inventory")
})

router.get("/explore", (req, res) => {
    res.render("profileViews/explore")
})

router.get("/wealth", (req, res) => {
    res.render("profileViews/wealth")
})
>>>>>>> master





module.exports = router;