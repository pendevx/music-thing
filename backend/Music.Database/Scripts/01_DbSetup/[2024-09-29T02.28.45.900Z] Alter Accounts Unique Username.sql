IF OBJECT_ID('Accounts_Username_Unique') IS NULL
    BEGIN

        ALTER TABLE Accounts
            ADD CONSTRAINT Accounts_Username_Unique UNIQUE (Username)

    END
