const express = require("express");
const bcrypt = require("bcrypt");
const db = require("../db/connection");
const { getUserById } = require("../db/queries/users");
const { getNotes } = require("../db/queries/notes");
const router = express.Router();

router.get("/", async (req, res) => {
  res.locals.title = "Notes";
  //get user_id cookie that is set during registration/log in
  const cookie = req.cookies["user_id"];

  const notes = await getNotes(cookie);

  // to test what are the notes output
  //console.log(notes)

  const templateVars = {
    notes,
  };
  res.render("notes", templateVars);
});

module.exports = router;
