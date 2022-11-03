const express = require("express");
const router = express.Router();
const User = require("../models/User.model");
const bcrypt = require("bcryptjs");

router.get("/login", (req, res) => {
  res.render("auth/login");
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const currentUser = await User.findOne({ username });
  try {
    if (!currentUser) {
      res.render("auth/login", { errorMessage: "Username does not exist" });
    } else {
      if (bcrypt.compareSync(password, currentUser.password)) {
        req.session.user = currentUser;
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
        });
        res.redirect("/login");
      }
    }
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
