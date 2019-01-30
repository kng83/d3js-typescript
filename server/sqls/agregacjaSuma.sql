--Pokazano tutaj jak zrobic sume lat z tabeli.
--Najwazniejsze sa aliase a dla tabeli first i Suma_Lat jako nowa kolumna


SELECT * FROM [Pyszczek].[dbo].[First];
SELECT SUM (a.Age) as Suma_Lat
From [Pyszczek].[dbo].[First] as a;

/*
--inaczej to samo co u gory

use Pyszczek;
go
--SELECT * FROM dbo.First;
SELECT SUM (col.Age)  Suma_Lat
From dbo.First as col ;

*/

/*
--zmiana nazwy kolumny
-- kolumny zmieniamy w cudzyslowie natomiast nazwy tablicy bez cudzyslowow
use Pyszczek
go
SP_RENAME 'First.Miasto' , 'First.MIASTO';