const express = require("express");
const app = express();
const port = 3001;
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
        {Accept: 'application/json',
        'Content-Type': 'application/json'}
    );
    res.header(
        "Access-Control-Allow-Methods",
        "GET, POST, HEAD, OPTIONS, PATCH, DELETE"
    );
    next();
});

const router = express.Router();
router.get("/", (req, res) => 
    res.json({ message: "API running on port 3001"})
);
app.use("/", router);

app.listen(port);
console.log("teste");

const executeSQL = (sql, res) => {
    global.conn.request()
        .query(sql)
        .then(result => res.json(result.recordset))
        .catch(err => res.json(err));
};

function executeQuery(sql, res) {
    global.conn
      .request()
      .query(sql)
      .then(result => {
        let obj = result.recordset[0];
        let ret = obj[""];
        console.log(ret);
        if(ret == 1) {
            res.status(200);
            res.json(result.recordset[0]);
        } else 
        {
            res.status(404);
        }})
      .catch(e => res.json(e));
};

router.get("/getUsers", (req, res) => 
    executeSQL(`select * from tcc_Usuarios`, res)
);

router.get("/getTxts", (req, res) => 
    executeSQL(`select * from tcc_Txt`, res)
);

router.get("/getVids", (req, res) => 
    executeSQL(`select * from tcc_Vid`, res)
);

router.get("/getForms", (req, res) => 
    executeSQL(`select * from tcc_FormAval`, res)
);

router.get("/getNotas", (req, res) => 
    executeSQL(`select * from tcc_NotasAval`, res)
);

router.post("/setAula", (req, res) => {
    const email = req.body.email;
    const ultimaAula = req.body.ultimaAula;
    executeQuery(`update tcc_Usuarios set ultimaAula = '${ultimaAula}' where email = '${email}'`, res);
});

router.post('/addUsersInfo', (req, res) => {
    let nome = req.body.nome;
    let idade = req.body.idade;
    let local = req.body.local;
    let ocupacao = req.body.ocupacao;
    let educacao = req.body.educacao;
    let toca = req.body.toca;
    executeQuery(`INSERT INTO tcc_infoQuestionados VALUES('${nome}', '${idade}', '${local}', '${ocupacao}', '${educacao}', '${toca}')`, res);
});

router.post('/answerColors', (req, res) => {
    let id = req.body.id;
    let perguntaNota1 = req.body.perguntaNota1;
    let perguntaNota2 = req.body.perguntaNota2;
    let perguntaNota3 = req.body.perguntaNota3;
    let perguntaNota4 = req.body.perguntaNota4;
    let perguntaNota5 = req.body.perguntaNota5;
    let perguntaNota6 = req.body.perguntaNota6;
    let perguntaNota7 = req.body.perguntaNota7;
    let perguntaNota8 = req.body.perguntaNota8;
    let perguntaNota9 = req.body.perguntaNota9;
    let perguntaNota10 = req.body.perguntaNota10;
    let perguntaNota11 = req.body.perguntaNota11;
    let perguntaNota12 = req.body.perguntaNota12;
    let perguntaNota13 = req.body.perguntaNota13;
    let perguntaNota14 = req.body.perguntaNota14;
    let perguntaNota15 = req.body.perguntaNota15;
    let perguntaAcorde1 = req.body.perguntaAcorde1;
    let perguntaAcorde2 = req.body.perguntaAcorde2;
    let perguntaAcorde3 = req.body.perguntaAcorde3;
    let perguntaAcorde4 = req.body.perguntaAcorde4;
    let perguntaAcorde5 = req.body.perguntaAcorde5;
    let perguntaAcorde6 = req.body.perguntaAcorde6;
    let perguntaAcorde7 = req.body.perguntaAcorde7;
    let perguntaAcorde8 = req.body.perguntaAcorde8;
    let perguntaAcorde9 = req.body.perguntaAcorde9;
    let perguntaAcorde10 = req.body.perguntaAcorde10;
    let perguntaAcorde11 = req.body.perguntaAcorde11;
    let perguntaAcorde12 = req.body.perguntaAcorde12;
    let perguntaFuncao1 = req.body.perguntaFuncao1;
    let perguntaFuncao2 = req.body.perguntaFuncao2;
    let perguntaFuncao3 = req.body.perguntaFuncao3;
    let perguntaFuncao4 = req.body.perguntaFuncao4;
    let perguntaFuncao5 = req.body.perguntaFuncao5;
    let perguntaFuncao6 = req.body.perguntaFuncao6;
    let perguntaFuncao7 = req.body.perguntaFuncao7;
    let perguntaFuncao8 = req.body.perguntaFuncao8;
    let perguntaFuncao9 = req.body.perguntaFuncao9;
    let perguntaFuncao10 = req.body.perguntaFuncao10;
    let perguntaFuncao11 = req.body.perguntaFuncao11;
    let perguntaFuncao12 = req.body.perguntaFuncao12;
    executeQuery(`INSERT INTO tcc_respostasCores VALUES('${id}', '${perguntaNota1}', '${perguntaNota2}', '${perguntaNota3}', '${perguntaNota4}', '${perguntaNota5}', '${perguntaNota6}', '${perguntaNota7}', '${perguntaNota8}', '${perguntaNota9}', '${perguntaNota10}', '${perguntaNota11}', '${perguntaNota12}', '${perguntaNota13}', '${perguntaNota14}', '${perguntaNota15}', '${perguntaAcorde1}', '${perguntaAcorde2}', '${perguntaAcorde3}', '${perguntaAcorde4}', '${perguntaAcorde5}', '${perguntaAcorde6}', '${perguntaAcorde7}', '${perguntaAcorde8}', '${perguntaAcorde9}', '${perguntaAcorde10}', '${perguntaAcorde11}', '${perguntaAcorde12}', '${perguntaFuncao1}', '${perguntaFuncao2}', '${perguntaFuncao3}', '${perguntaFuncao4}', '${perguntaFuncao5}', '${perguntaFuncao6}', '${perguntaFuncao7}', '${perguntaFuncao8}', '${perguntaFuncao9}', '${perguntaFuncao10}', '${perguntaFuncao11}', '${perguntaFuncao12}')`, res);
});

router.post('/addUsers', (req, res) => {
    const nome = req.body.nome;
    const idade = req.body.idade;
    const email = req.body.email;
    const senha = req.body.senha;
    const ultimaAula = 0;
    executeQuery(`INSERT INTO tcc_Usuarios VALUES('${nome}', '${idade}', '${email}', '${senha}', '${ultimaAula}')`, res);
});

router.post('/addAnswerAval', (req, res) => {
    const email = req.body.email;
    const id = req.body.id;
    const resp1 = req.body.resp1;
    const resp2 = req.body.resp2;
    const resp3 = req.body.resp3;
    const resp4 = req.body.resp4;
    const resp5 = req.body.resp5;
    const resp6 = req.body.resp6;
    const resp7 = req.body.resp7;
    const resp8 = req.body.resp8;
    const resp9 = req.body.resp9;
    const resp10 = req.body.resp10;
    const resp11 = req.body.resp11;
    const resp12 = req.body.resp12;
    executeQuery(`INSERT INTO tcc_RespAval VALUES('${email}','${id}','${resp1}', '${resp2}', '${resp3}', '${resp4}','${resp5}', '${resp6}', '${resp7}', '${resp8}','${resp9}', '${resp10}', '${resp11}', '${resp12}')`, res);
});

app.use("/", router);