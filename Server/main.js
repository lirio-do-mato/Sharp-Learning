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

router.get("/teste", (req, res) => 
    executeSQL(`select * from Paciente`, res)
);

router.get("/getUsers", (req, res) => 
    executeSQL(`select * from tcc_Usuarios`, res)
);

router.get("/getTxts", (req, res) => 
    executeSQL(`select * from tcc_Txt`, res)
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
    executeQuery(`INSERT INTO tcc_Usuarios VALUES('${nome}', '${idade}', '${email}', '${senha}')`, res);
});

router.post('/addForm5', (req, res) => {
    const email = req.body.email;
    const desc = req.body.desc;
    const p1 = req.body.p1;
    const p2 = req.body.p2;
    const p3 = req.body.p3;
    const p4 = req.body.p4;
    const p5 = req.body.p5;
    executeQuery(`INSERT INTO tcc_Form5Questoes VALUES('${email}', '${desc}', '${p1}', '${p2}', '${p3}', '${p4}', '${p5}')`, res);
});

router.post('/addResp5', (req, res) => {
    const email = req.body.email;
    const p1 = req.body.p1;
    const p2 = req.body.p2;
    const p3 = req.body.p3;
    const p4 = req.body.p4;
    const p5 = req.body.p5;
    executeQuery(`INSERT INTO tcc_Resposta5Questoes VALUES('${email}', '${p1}', '${p2}', '${p3}', '${p4}', '${p5}')`, res);
});

router.post('/addForm10', (req, res) => {
    const email = req.body.email;
    const desc = req.body.desc;
    const p1 = req.body.p1;
    const p2 = req.body.p2;
    const p3 = req.body.p3;
    const p4 = req.body.p4;
    const p5 = req.body.p5;
    const p6 = req.body.p1;
    const p7 = req.body.p2;
    const p8 = req.body.p3;
    const p9 = req.body.p4;
    const p10 = req.body.p5;
    executeQuery(`INSERT INTO tcc_Form10Questoes VALUES('${email}', '${desc}', '${p1}', '${p2}', '${p3}', '${p4}', '${p5}', '${p6}', '${p7}', '${p8}', '${p9}', '${p10}')`, res);
});

router.post('/addResp10', (req, res) => {
    const email = req.body.email;
    const p1 = req.body.p1;
    const p2 = req.body.p2;
    const p3 = req.body.p3;
    const p4 = req.body.p4;
    const p5 = req.body.p5;
    const p6 = req.body.p1;
    const p7 = req.body.p2;
    const p8 = req.body.p3;
    const p9 = req.body.p4;
    const p10 = req.body.p5;
    executeQuery(`INSERT INTO tcc_Resposta10Questoes VALUES('${email}', '${p1}', '${p2}', '${p3}', '${p4}', '${p5}', '${p6}', '${p7}', '${p8}', '${p9}', '${p10}')`, res);
});

app.use("/", router);