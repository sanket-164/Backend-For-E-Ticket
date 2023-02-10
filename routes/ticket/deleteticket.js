const express = require("express");
const router = express.Router();
const fetchuser = require("../middleware/fetchuser");

const con = require("../database");

router.delete("/", fetchuser, async (req, res) => {
  const { tid } = req.body;
  console.log(tid);
  let success = true;

  try {
    const delTicket = `DELETE FROM ticket where t_id='${tid}' && p_id='${req.user.id}';`;
    con.query(delTicket, (err, qres) => {
      if (err) {
        console.log(err.message);
        success = false;
      }
      if (qres) {
        console.log(qres)
        console.log("Ticket Deleted");
      }
      res.json({ success });
    });
  } catch (error) {
    res.json({error: error.message});
    res.status(500).send("Some error occured");
  }
});

module.exports = router;
