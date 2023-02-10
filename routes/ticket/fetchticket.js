const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const fetchuser = require("../middleware/fetchuser");

const con = require("../database");

router.post("/", fetchuser, async (req, res) => {
  const { limit } = req.body;
  let success = true;

  console.log(req.user);
  try {
    const fetchTicket = `SELECT * FROM ticket where p_id='${req.user.id}' ORDER BY t_date LIMIT ${limit};`;
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
