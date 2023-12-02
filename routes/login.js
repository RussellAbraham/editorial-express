const express = require("express");
const bcrypt = require("bcrypt");
const { getUserByUserName } = require("../db/queries/users");
const router = express.Router();

router.get("/", async (req, res) => {
  const userId = req.cookies["user_id"];
  if (userId) {
    res.redirect("/notebooks");
    return;
  }
  res.locals.title = "Login";
  res.render('login');
});

router.post("/", async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await getUserByUserName(username);

    if (!user) {
      console.log("Username does not exist");
      return res.status(401).send("Username does not exist");
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      console.error("Password does not match");
      return res.status(401).send("Password does not match");
    }

    console.log("Login success");
    const userId = user.id;
    res.cookie("user_id", userId);
    res.redirect("/notebooks");
  } catch (err) {
    console.error("Error:", err);
    res.status(500).send("Error");
  }
});

module.exports = router;
