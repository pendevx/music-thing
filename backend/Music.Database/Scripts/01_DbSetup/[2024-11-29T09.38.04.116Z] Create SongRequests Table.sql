IF OBJECT_ID('SongRequests', 'U') IS NULL
BEGIN

CREATE TABLE SongRequests (
    Id INT PRIMARY KEY IDENTITY (1,1),
    RequestStatus VARCHAR(100) NOT NULL, -- Awaiting, Accepted, Rejected
    SourceUrl VARCHAR(2048) NOT NULL,
    Source VARCHAR(50) NOT NULL,
    UploaderAccountId INT NOT NULL REFERENCES Accounts(Id),
    Name VARCHAR(256) NOT NULL,
    MimeType VARCHAR(50),
    CreatedOn DATETIME2 NOT NULL
)

END
