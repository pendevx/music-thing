IF OBJECT_ID('Accounts', 'U') IS NULL
    BEGIN

        CREATE TABLE Accounts
        (
            Id             INT PRIMARY KEY IDENTITY (1,1),
            Guid           UNIQUEIDENTIFIER NOT NULL UNIQUE,
            Username       NVARCHAR(256)    NOT NULL UNIQUE,
            SaltedPassword VARBINARY(MAX)   NOT NULL,
            CreatedOn      DATETIME2        NOT NULL,
            DisplayName    NVARCHAR(30)     NOT NULL DEFAULT ''
        )

    END
