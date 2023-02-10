const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");

const con = require("../database");

router.put("/", async (req, res) => {
  const { tid, pid, start, dest, expires, date, fair } = req.body;
  let success = true;

  try {
    const inTicket = `INSERT INTO ticket VALUES ('${tid}','${pid}','${start}','${dest}','${expires}','${date}','${fair}')`;
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
