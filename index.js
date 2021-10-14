const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const mysql = require("mysql");

const PORT = process.env.PORT || 3001;

const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "password",
  database: "NSS_db",
});
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("HelloAgain");
});

app.post("/insert", (req, res) => {
  const currentUser = req.body.currentUser;
  const address = req.body.address;
  const date = req.body.date;
  const time = req.body.time;
  const checkStatus = req.body.checkStatus;

  const sqlInsert =
    "INSERT INTO `NSS_db`.`check` (`fullname`, `address` ,`date`, `time`, `status`) VALUES (?,?,?,?,?);";
  db.query(
    sqlInsert,
    [currentUser, address, date, time, checkStatus],
    (err, result) => {
      console.log(err);
    }
  );
});

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}
const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Serving on port ${PORT}`);
});
