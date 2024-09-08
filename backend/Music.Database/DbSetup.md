# Database Setup Steps - no SSMS on the server

## SQL Server Installation

Install [SQL Server](https://www.microsoft.com/en-nz/sql-server/sql-server-downloads) onto server device. 

## Setting up connection over the network

### SQL Server Configuration Manager

1. Enable TCP/IP connections in SQL Server Configuration Manager.
2. In the TCP/IP popup, locate `IP Addresses` tab. Go to IP ALL (bottom).
3. Remove the 0 from dynamic port. Set the TCP port. (1433)
4. Apply changes, restart SQL Server instance.

### Firewall

1. Create inbound rule.
2. Specify port used in SQL Server above.
3. Allow incoming connections.
4. Specify allowed range (private, domain, public).

## Enabling SQL Server Authentication in SQL Server

1. Open sqlcmd.exe
2. Run the sql command to enable the super-admin account:
    ```tsql
    USE [master]
    GO
    
    ALTER LOGIN sa ENABLE;
    GO
    
    ALTER LOGIN sa WITH PASSWORD = '<enterStrongPasswordHere>';
    GO
    ```
3. Run the sql command to change server authentication to mixed mode:
    ```tsql
    EXEC xp_instance_regwrite N'HKEY_LOCAL_MACHINE',
        N'Software\Microsoft\MSSQLServer\MSSQLServer',
        N'LoginMode', REG_DWORD, 2;
    GO
    ```
4. Restart the SQL Server instance.

src: [Microsoft Docs](https://learn.microsoft.com/en-us/sql/database-engine/configure-windows/change-server-authentication-mode?view=sql-server-ver16&tabs=t-sql)

## Connecting from SSMS over the network from another computer

1. Click Connect.
2. Server name: IP Address of server.
3. Login: sa
4. Password: the password which was set above.

## Enabling FILESTREAM

1. In SQL Server Configuration Manager, open properties of SQL Server instance.
2. Under the FILESTREAM tab, tick all three boxes.
3. Apply and restart SQL Server.
4. Open sqlcmd.exe, and run:
    ```tsql
    EXEC sp_configure filestream_access_level, 2;
    RECONFIGURE;
    ```
