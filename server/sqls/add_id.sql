--Add id to existing file

--ALTER TABLE [Pyszczek].[dbo].[First] DROP COLUMN ID
ALTER TABLE [Pyszczek].[dbo].[First] ADD ID INT IDENTITY(1,1)