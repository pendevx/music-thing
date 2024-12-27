CREATE TABLE AccountRoles (
    Id INT PRIMARY KEY IDENTITY(1,1),
    AccountId INT REFERENCES Accounts(Id),
    RoleId INT REFERENCES Roles(Id),
    CreatedOn DATETIME2 NOT NULL
)
