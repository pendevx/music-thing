IF COL_LENGTH('Accounts', 'DisplayName') IS NULL
    BEGIN

        ALTER TABLE Accounts
        ADD DisplayName NVARCHAR(30) NOT NULL DEFAULT ''

    END
