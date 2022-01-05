const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const cors = require("cors");
const mysql = require("mysql");
const cookieParser = require("cookie-parser");
const path = require("path");
const fs = require("fs")
const auth = require("./client/src/routes/auth");
const port = 5000;
app.use(cors());  
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());

const data = fs.readFileSync("./database.json");
const conf = JSON.parse(data);

const connection = mysql.createConnection({
  host: conf.host,
  user: conf.user,
  password: conf.password,
  port: conf.port,
  database: conf.database
});

connection.connect((err) => {                           
  if(err) throw err;
  console.log("MySQL Conected!!!");
});


app.use('/auth', auth);

app.get("/api/products", (req, res) => {
    connection.query(
      "SELECT * FROM Products",
      (err, rows, fields) => {
        res.send(rows);
      }
    )
});

app.get("/api/boards", (req, res) => {
    connection.query(
      "SELECT * FROM Boards",
      (err, rows, fields) => {
        res.send(rows);
      }
    )
});

app.listen(port, () => console.log(`Listening on port ${port}`));
