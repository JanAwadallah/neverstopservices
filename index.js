const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const mysql = require("mysql");
const path = require("path");

const db = mysql.createPool({
  host: "us-cdbr-east-04.cleardb.com",
  user: "b7e7d98d494cc4",
  password: "a3f2fdee",
  database: "heroku_cb67353c6266fb0",
});
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post("/insert", (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  const currentUser = req.body.currentUser;
  const address = req.body.address;
  const date = req.body.date;
  const time = req.body.time;
  const checkStatus = req.body.checkStatus;

  const sqlInsert =
    "INSERT INTO `heroku_cb67353c6266fb0`.`check` (`fullname`, `address` ,`date`, `time`, `status`) VALUES (?,?,?,?,?);";
  db.query(
    sqlInsert,
    [currentUser, address, date, time, checkStatus],
    (err, result) => {
      console.error(err);
    }
  );
});



if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}
const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Serving on port ${PORT}`);
});
