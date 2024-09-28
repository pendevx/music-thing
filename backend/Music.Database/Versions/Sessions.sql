IF OBJECT_ID('Sessions', 'U') IS NULL
    BEGIN

        CREATE TABLE Sessions
        (
            Id        INT PRIMARY KEY IDENTITY (1,1),
            AccountId INT       NOT NULL REFERENCES Accounts (Id),
            CreatedOn DATETIME2 NOT NULL,
            ExpiresOn DATETIME2 NOT NULL
        )

    END
