using System.Security.Cryptography;
using Music.Backend.Repositories.Contracts;
using Music.Backend.Services.Contracts;

namespace Music.Backend.Services;

public class AuthenticationService : IAuthenticationService
{
    private readonly IAccountRepository _accountRepository;

    public AuthenticationService(IAccountRepository accountRepository)
    {
        _accountRepository = accountRepository;
    }

    private static byte[] GenerateSaltedHash(byte[] raw, byte[] salt)
    {
        var salted = (byte[])raw.Concat(salt);
        return SHA256.HashData(salted);
    }

    public bool Register(string username, string password, string displayName)
    {
        /**
         * 1. check if the username exists in the db. if exists, return an error
         * 2. salt the password
         * 3. store user details into db
         */

        throw new NotImplementedException();
    }

    public string Login(string username, string password)
    {
        /**
         * 1. salt the password
         * 2. grab the user record from the database with matchin username and salted password
         * 3. associate login with a cookie and return the cookie
         */
        throw new NotImplementedException();
    }
}
