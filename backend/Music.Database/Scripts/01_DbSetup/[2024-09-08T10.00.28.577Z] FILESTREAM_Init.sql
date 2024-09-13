-- Set up FILESTREAM
IF NOT EXISTS(
    SELECT *
    FROM MusicThing.sys.database_files
    WHERE type_desc = 'ROWS' and name='MusicThing'
)
    BEGIN
        ALTER DATABASE MusicThing
            ADD FILEGROUP MusicFileGroups CONTAINS FILESTREAM

        ALTER DATABASE MusicThing
            ADD FILE ( Name = N'MusicThing', FILENAME = N'C:\MusicThing_Files' )
                TO FILEGROUP MusicFileGroups
    END
