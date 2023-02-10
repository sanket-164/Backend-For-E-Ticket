const express = require("express");
const router = express.Router();
const fetchuser = require("../middleware/fetchuser");

const con = require("../database");

router.post("/", fetchuser, async (req, res) => {
  const { pid, uname, name, email, no, dob } = req.body;

  try {
    var success = true;

    const transcation = "START TRANSACTION;";
    con.query(transcation);

    if (uname) {
      const query = `UPDATE login SET uname='${uname}' WHERE id='${pid}';`;
      const query2 = `UPDATE passenger SET p_uname='${uname}' WHERE p_id='${pid}';`;
      con.query(query, (err, res) => {
        if (err) {
          console.log(err.message);
          success = false;
        } else if (res) {
          con.query(query2, (err, res) => {
            if (err) {
              console.log(err.message);
              success = false;
            }
          });
        }
      });
    }

    if (name) {
      const query = `UPDATE passenger SET p_name='${name}' WHERE p_id='${pid}';`;
      con.query(query, (err, res) => {
        if (err) {
          console.log(err.message);
          success = false;
        }
      });
    }

    if (email) {
      const query = `UPDATE passenger SET p_email='${email}' WHERE p_id='${pid}';`;
      con.query(query, (err, res) => {
        if (err) {
          console.log(err.message);
          success = false;
        }
      });
    }

    if (no) {
      const query = `UPDATE passenger SET p_no=${no} WHERE p_id='${pid}';`;
      con.query(query, (err, res) => {
        if (err) {
          console.log(err.message);
          success = false;
        }
      });
    }

    if (dob) {
      const query = `UPDATE passenger SET p_dob='${dob}' WHERE p_id='${pid}';`;
      con.query(query, (err, res) => {
        if (err) {
          console.log(err.message);
          success = false;
        }
      });
    }

    setTimeout(()=>{
      if (!success) {
        const rollback = "ROLLBACK;";
        con.query(rollback);
      } else {
        const commit = "COMMIT;";
        con.query(commit);
      }
      res.json({ success });
    },500)
    
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Some error occured");
  }
});

module.exports = router;
