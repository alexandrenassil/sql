
-- =============================================
CREATE PROCEDURE [dbo].[usp_jequiti_resgate_diretorio_audio]  -- Colocar o nome correto da tabela que o sistema ira carregar
	-- Add the parameters for the stored procedure here
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
SET NOCOUNT ON;

    -- Insert statements for procedure here

IF ( SELECT NAME FROM TEMPDB.SYS.TABLES WHERE NAME = '##jequiti_resgate_audio_temp') IS NOT NULL BEGIN DROP TABLE ##jequiti_resgate_audio_temp END                            
CREATE TABLE ##jequiti_resgate_audio_temp (caminho varchar(300))                          

DECLARE 
@DATA VARCHAR(10)
, @MES VARCHAR(2)
, @DIA VARCHAR(2)
, @ANO VARCHAR(4) 
SET @DATA = CONVERT(VARCHAR(10),GETDATE()-1,103)
SET @MES = substring(CONVERT(VARCHAR(10),GETDATE()-1,103),4,2)
SET @DIA = SUBSTRING(@DATA,1,2)
SET @ANO = SUBSTRING(@DATA,7,4)
            --L:\VOCALCOM\74\1\2020        
DECLARE @PASTA VARCHAR(max) SET @PASTA = 'MASTER.SYS.XP_CMDSHELL ''dir \\10.100.0.249\gravacao_1\VOCALCOM\74\1\'+@ANO+'\'+@MES+'\'+@ANO+@MES+@DIA+' /b /s /B'''                        
-- select * from  ##jequiti_resgate_audio_temp
INSERT INTO ##jequiti_resgate_audio_temp EXEC(@PASTA)

 insert into [Qualidade].dbo.jequiti_resgate_audio  -- Colocar o nome correto da tabela que o sistema ira carregar
(caminho
,id_indice
,data)
  select
   caminho
  ,substring(caminho,Char6+1,Char7-Char6-1)
  ,substring(caminho,Char9+1,Char10-Char9-1)
  from (  select caminho
 ,CharIndex('_',caminho,CharIndex('_',caminho,CharIndex('_',caminho,CharIndex('\',caminho,CharIndex('\',caminho,58)+1)+1)+1)+1) as Char6
 ,CharIndex('_',caminho,CharIndex('_',caminho,CharIndex('_',caminho,CharIndex('_',caminho,CharIndex('\',caminho,CharIndex('\',caminho,58)+1)+1)+1)+1)+1) as Char7
 ,CharIndex('\',caminho,CharIndex('\',caminho,CharIndex('\',caminho,CharIndex('\',caminho,CharIndex('\',caminho,CharIndex('\',caminho,CharIndex('\',caminho,CharIndex('\',caminho,CharIndex('\',caminho)+1)+1)+1)+1)+1)+1)+1)+1) as Char9
 ,CharIndex('\',caminho,CharIndex('\',caminho,CharIndex('\',caminho,CharIndex('\',caminho,CharIndex('\',caminho,CharIndex('\',caminho,CharIndex('\',caminho,CharIndex('\',caminho,CharIndex('\',caminho,CharIndex('\',caminho)+1)+1)+1)+1)+1)+1)+1)+1)+1) as Char10
 -- select *
 from 
 ##jequiti_resgate_audio_temp
 where (caminho like '%\5000\%' or caminho like '%\5001\%')
 and caminho not like '%NAO-TABULADO%') as a
  where char6 > 0
 and char7> 0


END