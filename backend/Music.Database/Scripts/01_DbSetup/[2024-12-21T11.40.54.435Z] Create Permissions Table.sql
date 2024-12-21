IF OBJECT_ID('Permissions', 'U') IS NULL
BEGIN

CREATE TABLE Permissions (
    Id INT PRIMARY KEY IDENTITY (1,1),
    PermissionName VARCHAR(100) NOT NULL UNIQUE,
    CreatedOn DATETIME2 NOT NULL
)

END

----------

IF OBJECT_ID('Roles', 'U') IS NULL
BEGIN

CREATE TABLE Roles (
    Id INT PRIMARY KEY IDENTITY(1,1),
    Name VARCHAR(50) NOT NULL,
    CreatedOn DATETIME2 NOT NULL
)

END

----------

IF OBJECT_ID('AccountRoles', 'U') IS NULL
BEGIN

CREATE TABLE AccountRoles (
    Id INT PRIMARY KEY IDENTITY(1,1),
    AccountId INT REFERENCES Accounts(Id),
    RoleId INT REFERENCES Roles(Id),
    CreatedOn DATETIME2 NOT NULL
)

END

----------

IF OBJECT_ID('RolePermissions', 'U') IS NULL
BEGIN

CREATE TABLE RolePermissions (
    Id INT PRIMARY KEY IDENTITY(1,1),
    PermissionId INT REFERENCES Permissions(Id),
    RoleId INT REFERENCES Roles(Id),
    CreatedOn DATETIME2 NOT NULL
)

END

-- A role can have many permissions, meaning any account with that role can perform any of those permissions.
-- An account can have many roles.
