const express = require("express");
const bcrypt = require("bcrypt");
const db = require("../db/connection");
const { getUserByUserName } = require("../db/queries/users");
const router = express.Router();

router.get("/", (req, res) => {
  // template variable for the document title
  res.locals.title = "Login";
  res.render("login");
});

router.post("/", async (req, res) => {
  const { username, password } = req.body;
  try {
    const testIfUserExists = await getUserByUserName(username);
    if (!testIfUserExists) {
      console.log("username does not exist");
      return res.status(401).send("Username does not exist");
    }
    const passwordMatch = await bcrypt.compare(
      password,
      testIfUserExists.password
    );
    if (passwordMatch) {
      console.log("Login success");
      const user = await getUserByUserName(username);
      if (user) {
        const userId = user.id;
        res.cookie("user_id", userId);
        res.redirect("/notes");
      } else {
        console.error("Not found");
        res.status(500).send("Error");
      }
    } else {
      console.error("No match");
      res.status(401).send("No match");
    }
  } catch (err) {
    console.error("Error");
    res.status(500).send("Error");
  }
});

module.exports = router;
