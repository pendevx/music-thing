-- Set up FILESTREAM
IF NOT EXISTS(
    SELECT *
    FROM sys.filegroups
    WHERE name = 'MusicFileGroups'
)
    BEGIN
        ALTER DATABASE MusicThing
            ADD FILEGROUP MusicFileGroups CONTAINS FILESTREAM;

        ALTER DATABASE MusicThing
            ADD FILE ( Name = N'MusicThing', FILENAME = N'C:\MusicThing_Files' )
                TO FILEGROUP MusicFileGroups;
    END
GO
