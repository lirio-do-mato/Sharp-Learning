const express = require("express");
const app = express();
const port = 3000;
require('dotenv').config();
const sql = require("mssql");
const {urlencoded, json} = require("body-parser");
const strConn = 
    `Server=;`+
    `Database=;`+
    `User Id=;`+
    `Password=`; //decidir bd

//console.log(strConn);
sql.connect(strConn)
    .then(conn => (global.conn = conn))
    .catch(e => console.log(e));

app.use(urlencoded({extended: true}));
app.use(json());

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    res.header(
        "Access-Control-Allow-Methods",
        "GET, POST, HEAD, OPTIONS, PATCH, DELETE"
    );
    next();
});

const router = express.Router();
router.get("/", (req, res) => 
    res.json({ message: "API running on port 3000"})
);
app.use("/", router);

app.listen(port);
console.log("teste");

function executeQuery(sql, res) {
    global.conn
      .request()
      .query(sql)
      .then(result => res.json(result.recordset))
      .catch(e => res.json(e));
};

