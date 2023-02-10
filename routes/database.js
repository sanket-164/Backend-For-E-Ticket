const mysql = require("mysql");

const con = mysql.createConnection({
  host: "127.0.0.1",
  port: "3307",
  user: "root",
  password: "",
  database: "e_ticket",
});

module.exports = con;
