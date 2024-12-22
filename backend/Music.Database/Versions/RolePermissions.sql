CREATE TABLE RolePermissions (
    Id INT PRIMARY KEY IDENTITY(1,1),
    PermissionId INT REFERENCES Permissions(Id),
    RoleId INT REFERENCES Roles(Id),
    CreatedOn DATETIME2 NOT NULL
)
