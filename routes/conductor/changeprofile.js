const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const fetchuser = require("../middleware/fetchuser");

const con = require("../database");

router.post("/", fetchuser,  async (req, res) => {
  const { cid, uname, name, email, no, dob } = req.body;
  let success = true;

  // If there are errors, return Bad request and the errors
  //   const errors = validationResult(req);
  //   if (!errors.isEmpty()) {
  //     success = false;
  //     return res.status(400).json({ success, error: errors.array() });
  //   }

  //check whether the user with this email exist already
  try {
    if (uname) {
      const query = `UPDATE login SET uname='${uname}' WHERE id='${cid}';`;
      const query2 = `UPDATE conductor SET c_uname='${uname}' WHERE c_id='${cid}';`;
      con.query(query, (err, res) => {
        if (err) {
          console.log(err.message);
          success = false;
        }
        if (res) {
          console.log("Username Changed");
        }
      });
      con.query(query2, (err, res) => {
        if (err) {
          console.log(err.message);
          success = false;
        }
        if (res) {
          console.log("Username Changed");
        }
      });
    }

    if (name) {
        const query = `UPDATE conductor SET c_name='${name}' WHERE c_id='${cid}';`;
        con.query(query, (err, res) => {
          if (err) {
            console.log(err.message);
            success = false;
          }
          if (res) {
            console.log("Name Changed");
          }
        });
    }

    if (email) {
        const query = `UPDATE conductor SET c_email='${email}' WHERE c_id='${cid}';`;
        con.query(query, (err, res) => {
          if (err) {
            console.log(err.message);
            success = false;
          }
          if (res) {
            console.log("Email Changed");
          }
        });
    }

    if (no) {
        const query = `UPDATE conductor SET c_no=${no} WHERE c_id='${cid}';`;
        con.query(query, (err, res) => {
          if (err) {
            console.log(err.message);
            success = false;
          }
          if (res) {
            console.log("Number Changed");
          }
        });
    }

    if (dob) {
        const query = `UPDATE conductor SET dob='${dob}' WHERE c_id='${cid}';`;
        con.query(query, (err, res) => {
          if (err) {
            console.log(err.message);
            success = false;
          }
          if (res) {
            console.log("Birthday Changed");
          }
        });
    }

    res.json({ success });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Some error occured");
  }
});

module.exports = router;
