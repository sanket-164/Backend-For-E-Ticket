const express = require("express");
const app = express();
const port = 3000;

const con = require("./routes/database");

con.connect((error) => {
  if (error) {
    throw error;
  } else {
    console.log("connected");
  }
});

app.use(express.json());

app.use("/login", require("./routes/authentication/login"));
app.use("/signup", require("./routes/authentication/signup"));

app.use('/changeprofile', require('./routes/passenger/changeprofile'));

app.use('/createticket', require('./routes/ticket/createticket'));
app.use('/fetchticket', require('./routes/ticket/fetchticket'));
app.use('/deleteticket', require('./routes/ticket/deleteticket'));

app.use('/scanticket', require('./routes/conductor/scanticket'));

app.use('/fetchuser', require('./routes/admin/fetchuser'));
app.use('/fetchtickets', require('./routes/admin/fetchtickets'));
// app.use('/fetchconductor', require('./routes/admin/fetchconductor'));
app.use('/createconductor', require('./routes/admin/createconductor'));

app.listen(port, () => {
  console.log("App listining at http://localhost:" + port);
});
