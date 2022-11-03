const express = require('express');
const router = express.Router();
const User = require("../models/User.model")

router.get("/login", (req, res) => {
    res.render("auth/login")
})

router.post("/login", async(req, res) => {
    const { username, password } = req.body
    const currentUser = await User.findOne({ username })
    try{
        if (!currentUser) {
            res.render("auth/login", {errorMessage: "Username does not exist"} )
        }

        else {
            if (bcrypt.compareSync(password, currentUser.password)) {
                req.session.user = currentUser
                res.redirect("/profile")
            } else {
                res.render("auth/login", {errorMessage: "Incorrect password"})
            }
        }}
        catch (error) {
            console.log(error)
        }
 })


 router.get("/logout", (req, res, next) => {
    req.session.destroy(err => {
        if (err) {
            next(err)
        }
        res.redirect("/login")
    })
 })


module.exports = router;