const express = require("express");
const router = express.Router();

const con = require("../database");

router.post("/", async (req, res) => {
  const { pid, limit } = req.body;
  let success = true;

  try {
    const fetchPassenger = `SELECT * FROM ticket;`;
    con.query(fetchPassenger, (err, qres) => {
      if (err) {
        console.log(err.message);
        success = false;
      }
      if (qres) {
        console.log("Selected from Ticket");
        res.json({ success, tickets: qres});
      }
    });
  } catch (error) {
    res.json({error: error.message});
    res.status(500).send("Some error occured");
  }
});

module.exports = router;
