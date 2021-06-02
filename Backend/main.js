const express = require("express");
const app = express();
const port = 3000;
require('dotenv').config();
const sql = require("mssql");
const {urlencoded, json} = require("body-parser");
const strConn = 
    `Server=regulus.cotuca.unicamp.br;`+ //process.env.DB_SERVER
    `Database=BD19185;`+ //process.env.DB_BASE
    `User Id=BD19185;`+ //process.env.DB_USER
    `Password=Cotuca PD 19`; //process.env.DB_PASSWORD

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

router.get("/teste", (req, res) => 
    executeQuery(`select * from Paciente`, res)
);

router.post('/addUsersInfo', (req, res) => {
    let nome = req.body.nome;
    let idade = req.body.idade;
    let local = req.body.local;
    let ocupacao = req.body.ocupacao;
    let educacao = req.body.educacao;
    let toca = req.body.toca;
    executeQuery(`INSERT INTO tcc_infoQuestionados VALUES('${nome}', '${idade}', '${local}', '${ocupacao}', '${educacao}', '${toca}')`, res);
});

app.use("/", router);