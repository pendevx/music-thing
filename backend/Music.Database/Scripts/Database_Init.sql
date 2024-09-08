-- Create database
IF NOT EXISTS(
    SELECT *
    FROM sys.databases
    WHERE name = 'MusicThing'
)
    BEGIN
        CREATE DATABASE [MusicThing]
    END
GO

USE [MusicThing]
GO
