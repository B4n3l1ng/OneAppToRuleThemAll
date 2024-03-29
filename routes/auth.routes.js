const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const User = require("../models/User.model");
const isLoggedIn = require("../middleware/routes");
const isLoggedOut = require("../middleware/routes");

router.get("/login", (req, res) => {
  res.render("auth/login");
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const currentUser = await User.findOne({ username });
    if (!currentUser) {
      res.render("auth/login", { errorMessage: "Username does not exist" });
    } else {
      if (bcrypt.compareSync(password, currentUser.password)) {
        console.log(currentUser._doc);
        const loggedUser = { ...currentUser._doc };
        delete loggedUser.password;
        req.session.user = loggedUser;
        res.redirect("/profile");
      } else {
        res.render("auth/login", { errorMessage: "Incorrect password" });
      }
    }
  } catch (error) {
    console.log(error);
  }
});

router.get("/logout", (req, res, next) => {
  req.session.destroy((err) => {
    if (err) {
      next(err);
    }
    res.redirect("/login");
  });
});

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
          money: 150,
          basket: [],
          inventory: [],
        });
        res.redirect("/login");
      }
    }
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
