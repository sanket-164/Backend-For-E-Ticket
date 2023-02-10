const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const fetchuser = require("../middleware/fetchuser");

const con = require("../database");

router.post("/", fetchuser, async (req, res) => {
  const { tid } = req.body;
  let success = true;

  try {
    const fetchTicket = `SELECT IF(expires>=CURRENT_TIME() && t_date>=CURRENT_DATE(),'Valid','Expired') as Ticket FROM ticket where t_id='${tid}';`;
    
    // console.log(tid);

    con.query(fetchTicket, (err, qres) => {
      if (err) {
        console.log(err.message);
        success = false;
      }else if(qres.length>0) {

        console.log(qres[0]);
        
        msg = "Ticket is valid";
      }else{
        msg = "Ticket is expired";
      }
      res.json({ success, ticket: qres[0].Ticket});
    });
  } catch (error) {
    res.json({error: error.message});
    res.status(500).send("Some error occured");
  }
});

module.exports = router;
