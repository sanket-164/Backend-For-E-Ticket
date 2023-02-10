const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
var bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");

const con = require("../database");

const SECRET_MSG = "E-TICKET";

router.post(
  "/",
  [
    body("password", "Password must be 8 characters").isLength({ min: 8 })
  ],
  async (req, res) => {
    let success = true;
    let user;
    const { uname, password } = req.body;

    // If there are errors, return Bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      success = false;
      return res.status(400).json({ error: errors.array() });
    }

    try {
      const findUser = `SELECT * FROM login WHERE uname='${uname}'`;
      // Checks user with this email exist or not
      con.query(findUser, (err, queryres) => {
        if (err) {
          console.log(err.message);
        } else {
          console.log(queryres);
          user = queryres;

          console.log(user[0].id);

          if (!user) {
            success = false;
            return res
              .status(400)
              .json({ success, error: "User does not exist" });
          }
          const passwordCompare = bcrypt.compare(password, user[0].pwd);
          if (!passwordCompare) {
            success = false;
            return res.status(400).json({ success, error: "Enter valid data" });
          }

          const data = {
            id: user[0].id,
          };
          const authToken = jwt.sign(data, SECRET_MSG);
          res.json({ success, authToken: authToken });
        }
      });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Some error occured");
    }
  }
);

module.exports = router;
