create table tcc_infoQuestionados(
id int primary key identity,
nome varchar(100),
idade int not null,
ondeMora varchar(100),
ocupacao varchar(100),
educacaoMusical varchar(100) not null,
tocaInstrumento varchar (100))


create table tcc_Vid(
id int primary key identity,
titulo varchar(100) not null,
link varchar(100) not null)
select * from tcc_infoQuestionados

create table tcc_respostasCores(
id int primary key identity,
idInfo int not null,
perguntaNota1 varchar(100),
perguntaNota2 varchar(100),
perguntaNota3 varchar(100),
perguntaNota4 varchar(100),
perguntaNota5 varchar(100),
perguntaNota6 varchar(100),
perguntaNota7 varchar(100),
perguntaNota8 varchar(100),
perguntaNota9 varchar(100),
perguntaNota10 varchar(100),
perguntaNota11 varchar(100),
perguntaNota12 varchar(100),
perguntaNota13 varchar(100),
perguntaNota14 varchar(100),
perguntaNota15 varchar(100),
perguntaAcorde1 varchar(100),
perguntaAcorde2 varchar(100),
perguntaAcorde3 varchar(100),
perguntaAcorde4 varchar(100),
perguntaAcorde5 varchar(100),
perguntaAcorde6 varchar(100),
perguntaAcorde7 varchar(100),
perguntaAcorde8 varchar(100),
perguntaAcorde9 varchar(100),
perguntaAcorde10 varchar(100),
perguntaAcorde11 varchar(100),
perguntaAcorde12 varchar(100),
perguntaFuncao1 varchar(100),
perguntaFuncao2 varchar(100),
perguntaFuncao3 varchar(100),
perguntaFuncao4 varchar(100),
perguntaFuncao5 varchar(100),
perguntaFuncao6 varchar(100),
perguntaFuncao7 varchar(100),
perguntaFuncao8 varchar(100),
perguntaFuncao9 varchar(100),
perguntaFuncao10 varchar(100),
perguntaFuncao11 varchar(100),
perguntaFuncao12 varchar(100),
constraint fk_idInfoQuestionado foreign key(idInfo) references tcc_infoQuestionados(id))

select * from tcc_respostasCores

create table tcc_Usuarios (
nome varchar(100) not null,
idade int not null,
email varchar(100) primary key,
senha varchar(100) not null
)

create table tcc_Txt(
id int primary key identity,
titulo varchar(100) not null,
paragrafo1 varchar(500) not null,
paragrafo2 varchar(500),
paragrafo3 varchar(500),
paragrafo4 varchar(500)
)


create table tcc_RespAval (
id int primary key identity,
email varchar(100) not null,
idForm int not null,
resp1 varchar(100) not null,
resp2 varchar(100) not null,
resp3 varchar(100) not null,
resp4 varchar(100) not null,
resp5 varchar(100) not null,
resp6 varchar(100) not null,
resp7 varchar(100) not null,
resp8 varchar(100) not null,
resp9 varchar(100) not null,
resp10 varchar(100) not null,
resp11 varchar(100) not null,
resp12 varchar(100) not null
constraint fk_emailInfoQuestionado foreign key(email) references tcc_Usuarios(email),
constraint fk_idForms foreign key(idForm) references tcc_FormAval(id))

create table tcc_NotasAval(
id int primary key identity,
idForm int not null,
emailUser varchar(100) not null,
nota float not null
constraint fk_emailUs foreign key(emailUser) references tcc_Usuarios(email),
constraint fk_idForm foreign key(idForm) references tcc_FormAval(id))
