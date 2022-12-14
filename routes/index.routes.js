const express = require("express");
const router = express.Router();

router.get("/", (req, res, next) => {
  if (req.session.user) {
    res.redirect("/profile");
  } else {
    res.render("index");
  }
});

module.exports = router;
