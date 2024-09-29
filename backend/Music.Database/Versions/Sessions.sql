IF OBJECT_ID('Sessions', 'U') IS NULL
    BEGIN

        CREATE TABLE Sessions
        (
            Id        INT PRIMARY KEY IDENTITY (1,1),
            AccountId INT              NOT NULL REFERENCES Accounts (Id),
            CreatedOn DATETIME2        NOT NULL,
            ExpiresOn DATETIME2        NOT NULL,
            Token     UNIQUEIDENTIFIER NOT NULL UNIQUE DEFAULT '00000000-0000-0000-0000-000000000000'
        )

    END
