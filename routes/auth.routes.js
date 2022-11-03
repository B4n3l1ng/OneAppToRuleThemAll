const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const User = require("../models/User.model");

router.get("/signup", (req, res) => {
  res.render("auth/signup");
});

router.post("/signup", async (req, res) => {
  try {
    const salt = bcrypt.genSaltSync(12);
    const hashedPassword = bcrypt.hashSync(req.body.password, salt);
    if (await User.findOne({ username: req.body.username })) {
      const errorMessage = "The username is already in use";
      res.render("auth/signup", { errorMessage });
    } else {
      if (await User.findOne({ email: req.body.email })) {
        const errorMessage = "The email is already in use";
        res.render("auth/signup", { errorMessage });
      } else {
        await User.create({
          username: req.body.username,
          email: req.body.email,
          password: hashedPassword,
        });
        res.redirect("/login");
      }
    }
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
