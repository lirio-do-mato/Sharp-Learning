create table tcc_infoQuestionados(
id int primary key identity,
nome varchar(100),
idade int not null,
ondeMora varchar(100),
ocupacao varchar(100),
educacaoMusical varchar(100) not null,
tocaInstrumento varchar (100))

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
    id int primary key identity,
    nome varchar(100) not null,
	idade int not null,
	email varchar(100) not null,
	educacao varchar(100) not null,
	toca varchar(100) not null,
	senha varchar(100) not null
)

select * from tcc_Usuarios