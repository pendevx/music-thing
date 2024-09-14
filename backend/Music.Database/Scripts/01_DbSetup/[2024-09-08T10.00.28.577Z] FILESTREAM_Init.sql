-- Set up FILESTREAM
IF NOT EXISTS(
    SELECT *
    FROM MusicThing.sys.filegroups
    WHERE is_default = 1 and name='MusicFileGroups'
)
BEGIN
    ALTER DATABASE MusicThing
        ADD FILEGROUP MusicFileGroups CONTAINS FILESTREAM

    ALTER DATABASE MusicThing
        ADD FILE ( Name = N'MusicThingFiles', FILENAME = N'C:\MusicThing_Files\' )
            TO FILEGROUP MusicFileGroups
END
