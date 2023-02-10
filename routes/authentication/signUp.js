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
    body("name", "Enter a valid name").isLength({ min: 5 }),
    body("email", "Enter a valid Email").isEmail(),
    body("pwd", "Password must be 8 characters").isLength({ min: 8 }),
  ],
  async (req, res) => {
    const { uname, pwd, name, email, no, dob } = req.body;
    let success = true;

    const d = new Date();
    const id =
      "P" +
      ("0" + d.getFullYear()).slice(3) +
      ("0" + d.getMonth()).slice(-2) +
      ("0" + d.getDate()).slice(-2) +
      ("0" + d.getHours()).slice(-2) +
      ("0" + d.getMinutes()).slice(-2) +
      ("0" + d.getSeconds()).slice(-2) +
      ("0" + d.getMilliseconds()).slice(-2);

    // If there are errors, return Bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      success = false;
      return res.status(400).json({ success, error: errors.array() });
    }

    //check whether the user with this email exist already
    try {
      // const findUser = `SELECT * FROM login WHERE uname='${uname}'`;
      // // Checks user with this email exist or not
      // con.query(findUser, (err, res) => {
      //   if (err) {
      //     console.log(err.message);
      //   }
      //   if (res) {
      //     console.log(res);
      //     success = false;
      //     return res.status(400).json({
      //       success,
      //       error: "A user with this E-mail already exists try new E-mail",
      //     });
      //   }
      // });

      const salt = await bcrypt.genSalt(10);
      const secPass = await bcrypt.hash(pwd, salt);

      const transaction = "START TRANSACTION;";
      con.query(transaction);

      const inLogin = `INSERT INTO login VALUES ('${id}','${uname}','${secPass}')`;
      con.query(inLogin, (err, res) => {
        if (err) {
          console.log(err.message);
        }
        if (res) {
          console.log("Inserted in login");
        }
      });

      const inpassenger = `INSERT INTO passenger (p_uname, p_id, p_name, p_email, p_no, p_dob, balance) VALUES ('${uname}','${id}','${name}','${email}',${
        no ? no : null
      },'${dob}',${0.0})`;
      con.query(inpassenger, (err, res) => {
        if (err) {
          console.log(err.message);
          const rollback = "ROLLBACK;";
          con.query(rollback);
        }
        if (res) {
          console.log("Inserted in passenger");
          const commit = "COMMIT";
          con.query(commit);
        }
      });

      //   runQuery(query);
      const data = {
        id: id,
      };
      const authToken = jwt.sign(data, SECRET_MSG);
      res.json({ success, authToken });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Some error occured");
    }
  }
);

module.exports = router;
