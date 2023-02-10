const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const fetchuser = require("../middleware/fetchuser");

const con = require("../database");

router.put("/", fetchuser, async (req, res) => {
  const { start, dest, expires, date, fair } = req.body;
  let success = true;

  console.log(req.user);

  const d = new Date();
  const tid = 'T' + ('0' + d.getFullYear()).slice(3) + ('0' + d.getMonth()).slice(-2) + ('0' + d.getDate()).slice(-2) + ('0' + d.getHours()).slice(-2) + ('0' + d.getMinutes()).slice(-2) + ('0' + d.getSeconds()).slice(-2) + ('0' + d.getMilliseconds()).slice(-2);
  
  try {
    const inTicket = `INSERT INTO ticket VALUES ('${tid}','${req.user.id}','${start}','${dest}','${expires}','${date}','${fair}')`;
    con.query(inTicket, (err, qres) => {
      if (err) {
        console.log(err.message);
        success = false;
      }else if (qres) {
        console.log("Inserted in Ticket");
      }
      res.json({ success });
    });
  } catch (error) {
    res.json({error: error.message});
    res.status(500).send("Some error occured");
  }
});

module.exports = router;
