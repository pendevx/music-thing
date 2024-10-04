using Music.Backend.Models.Generated;

namespace Music.Backend.Services.Contracts;

public interface IAuthenticationService
{
    bool Register(string username, string password, string displayName);
    string Login(string username, string password);
    void CleanupExpiredTokensForAccount(int accountId);
    bool TokenIsActive(Guid token);
    Account? GetByToken(Guid token);
    void Logout(Guid token);
    Account? GetByUsername(string username);
}
