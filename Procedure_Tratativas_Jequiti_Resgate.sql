CREATE PROCEDURE [dbo].[usp_jequiti_resgate_importa_tratativas]  -- Colocar o nome correto da tabela que o sistema ira carregar
AS
BEGIN

SET NOCOUNT ON;
--=== verifica se existe uma tabela temporaria de nome '#jequiti_resgate', caso exista deleta e cria uma nova, senão só cria uma nova
IF ( SELECT NAME FROM TEMPDB.SYS.TABLES WHERE NAME = '#jequiti_resgate_temp') IS NOT NULL BEGIN DROP TABLE #jequiti_resgate_temp END

create table #jequiti_resgate_temp
(
	id varchar(255)  not null
	,[id_indice]  bigint not null
	,[data] datetime not null
	,[campanha] varchar(255) not null
	,[firstcampaign] varchar(255) not null
	,[fila] varchar(255) not null
	,[grupo] varchar(255) not null
	,firstagent varchar(255) not null
	,firstagent_cpf varchar(255) not null
	,nome_operador varchar(255) not null
	,nome_supervisor varchar(255) not null
	,nome_cliente varchar(255)
	,cpf_cnpj varchar(255)
	,cidade varchar(255)
	,tipificacao varchar(255)
	,status_atendimento varchar(255)
	,detalhe_atendimento varchar(255)
	,tma float not null
	,ultima_melhor_resposta int not null
)
-- insere os dados do select na tabela temporaria #jequiti_resgate_temp
insert into #jequiti_resgate_temp
SELECT
	id
	,INDICE
	,CALLLOCALTIME
	,'JEQUITI RESGATE'
	,FIRSTCAMPAIGN
	,FILA
	,GRUPO
	,ID_OPERADOR
	,CPF_OPERADOR
	,NOME_OPERADOR
	,SUPERVISOR
	,NOME_CLIENTE
	,CPF_CNPJ
	,CIDADE
	,TIPIFICACAO
	,STATUS_ATENDIMENTO
	,DETALHE_ATENDIMENTO
	,CAST([DURATION] AS FLOAT)/86400
	,ROW_NUMBER()OVER(PARTITION BY INDICE ORDER BY PRIORIDADE ASC, CALLLOCALTIME DESC) AS ROW
FROM -- SELECT DISTINCT FIRSTCAMPAIGN FROM 
	JEQUITI_DOACAO.DBO.RELATORIO_RECEPTIVO_UNIFICADO WITH(NOLOCK)
where datediff(month,convert(datetime,calllocaltime,103),getdate()) < 4
	and fila in ('RESGATE CADASTRO'
				,'RESGATE CARNE'
				,'RESGATE CARTAO CREDITO'
				,'RESGATE INFORMACAO')
	AND TIPIFICACAO NOT IN ('TELEFONIA (SISTEMA)','TESTE DE URA')
	and NOME_OPERADOR is not null
	and FIRSTCAMPAIGN is not null
	and id not in (
	select distinct id_tratativa collate database_default
	from
	jequiti_resgate_tratativa) -- Colocar o nome correto da tabela que o sistema ira carregar


-- SELECT TOP 100 * FROM #jequiti_resgate_temp

insert into jequiti_resgate_indice  -- Colocar o nome correto da tabela que o sistema ira carregar
(id_indice)
select 
	id_indice
	from #jequiti_resgate_temp
	where ultima_melhor_resposta = '1'
	and id_indice not in 
(select distinct id_indice
	from
	jequiti_resgate_indice)  -- Colocar o nome correto da tabela que o sistema ira carregar

insert into jequiti_resgate_tratativa  -- Colocar o nome correto da tabela que o sistema ira carregar
select *
	from
	#jequiti_resgate_temp
	where id not in
(select distinct id_tratativa  collate database_default
	from
	jequiti_resgate_tratativa)  -- Colocar o nome correto da tabela que o sistema ira carregar

 update a
set a.ultima_melhor_resposta = b.row
from jequiti_resgate_tratativa as a  -- Colocar o nome correto da tabela que o sistema ira carregar
join (
select id
,ROW_NUMBER()OVER(PARTITION BY INDICE ORDER BY PRIORIDADE ASC, CALLLOCALTIME DESC) AS ROW
FROM JEQUITI_DOACAO.DBO.RELATORIO_RECEPTIVO_UNIFICADO WITH(NOLOCK)
WHERE datediff(month,convert(datetime,calllocaltime,103),getdate()) < 4
	and fila in ('RESGATE CADASTRO'
				,'RESGATE CARNE'
				,'RESGATE CARTAO CREDITO'
				,'RESGATE INFORMACAO')
	AND TIPIFICACAO NOT IN ('TELEFONIA (SISTEMA)','TESTE DE URA')
	and NOME_OPERADOR is not null
	and FIRSTCAMPAIGN is not null) as b
	on a.id_tratativa = b.id collate database_default

update a
	set a.status_importacao = null
	,a.inicio_monitoria = null
	,a.fim_monitoria = null
	,a.login_tratativa = null
	,a.status_monitoria	 = null
	,a.obs = null 
	,a.erro_auditoria_ura = null
	,a.obs_auditoria_ura = null
	,a.medida = null
	,a.operador = null
	,a.nota = null
	,a.nota_real = null
	,a.status_monitoria_super = null
	,a.obs_feedback = null
	,a.num_contest = null
	,a.ficha = null
	,a.versao = null
	from
jequiti_resgate_indice as a  -- Colocar o nome correto da tabela que o sistema ira carregar
where status_importacao in ('AGUARDANDO MONITORIA','ABORTADO','EM TRATAMENTO')
