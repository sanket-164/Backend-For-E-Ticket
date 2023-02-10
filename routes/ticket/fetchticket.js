const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");

const con = require("../database");

router.post("/", async (req, res) => {
  const { pid, limit } = req.body;
  let success = true;

  try {
    const fetchTicket = `SELECT * FROM ticket where p_id='${pid}' ORDER BY t_date LIMIT ${limit};`;
    con.query(fetchTicket, (err, qres) => {
      if (err) {
        console.log(err.message);
        success = false;
      }
      if (qres) {
        console.log("Selected from Ticket");
        res.json({ success, ticket: qres});
      }
    });
  } catch (error) {
    res.json({error: error.message});
    res.status(500).send("Some error occured");
  }
});

module.exports = router;
