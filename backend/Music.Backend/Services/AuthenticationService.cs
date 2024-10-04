using System.Security.Authentication;
using System.Security.Cryptography;
using System.Text;
using Microsoft.EntityFrameworkCore;
using Music.Backend.Models.Generated;
using Music.Backend.Repositories.Contracts;
using Music.Backend.Services.Contracts;
using Music.Backend.Utils;

namespace Music.Backend.Services;

public class AuthenticationService : IAuthenticationService
{
    private const string GenericAuthenticationFailure = "The username or password did not match.";

    private readonly IAccountRepository _accountRepository;
    private readonly ISessionRepository _sessionRepository;

    public AuthenticationService(IAccountRepository accountRepository, ISessionRepository sessionRepository)
    {
        _accountRepository = accountRepository;
        _sessionRepository = sessionRepository;
    }

    private static byte[] GenerateSaltedHash(byte[] raw, byte[] salt)
    {
        var salted = raw.Concat(salt).ToArray();
        return SHA256.HashData(salted);
    }

    public bool Register(string username, string password, string displayName)
    {
        var existingAccount = _accountRepository.GetByUsername(username);

        if (existingAccount is not null)
            return false;

        var newGuid = Guid.NewGuid();
        var saltedPassword = GenerateSaltedHash(Encoding.UTF8.GetBytes(password), newGuid.ToByteArray());

        _accountRepository.Create(new Account
        {
            Guid = newGuid,
            Username = username,
            SaltedPassword = saltedPassword,
            DisplayName = displayName
        });

        return true;
    }

    public Guid Login(string username, string password)
    {
        var existingUser = _accountRepository.GetByUsername(username);

        if (existingUser is null)
            throw new AuthenticationException(GenericAuthenticationFailure);

        var saltedPassword = GenerateSaltedHash(Encoding.UTF8.GetBytes(password), existingUser.Guid.ToByteArray());

        if (!saltedPassword.IsEqual(existingUser.SaltedPassword))
            throw new AuthenticationException(GenericAuthenticationFailure);

        var token = Guid.NewGuid();

        _sessionRepository.Create(new Session
        {
            Account = existingUser,
            ExpiresOn = DateTime.UtcNow.AddDays(7), // Expire the token in one week
            Token = token
        });

        CleanupExpiredTokensForAccount(existingUser);

        return token;
    }

    public void CleanupExpiredTokensForAccount(int accountId)
    {
        var account = _accountRepository.GetById(accountId);

        if (account is null)
            return;

        CleanupExpiredTokensForAccount(account);
    }

    public bool TokenIsActive(Guid token)
    {
        return _sessionRepository.GetSessionByToken(token)?.ExpiresOn < DateTime.UtcNow;
    }

    public Account? GetByToken(Guid token)
    {
        return _sessionRepository.GetAccountFromSession(token);
    }

    public void Logout(Guid token)
    {
        var session = _sessionRepository.GetSessionByToken(token);

        if (session is not null)
            _sessionRepository.Delete(session);
    }

    public Account? GetByUsername(string username)
    {
        return _accountRepository.GetByUsername(username);
    }

    public bool ExtendSession(Guid token, int extensionSeconds)
    {
        var session = _sessionRepository.GetSessionByToken(token);

        if (session is null)
            return false;

        session.ExpiresOn = DateTime.UtcNow.AddSeconds(extensionSeconds);
        _sessionRepository.MusicContext.SaveChanges();

        return true;
    }

    private void CleanupExpiredTokensForAccount(Account account)
    {
        var toExpire = _sessionRepository.GetExpiredSessions(account.Id);
        _sessionRepository.Delete(toExpire);
    }
}
