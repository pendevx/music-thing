using Music.Backend.Services.Contracts;

namespace Music.Backend.Services;

public class AuthenticationService : IAuthenticationService
{
    public bool Register(string username, string password, string displayName)
    {
        /**
         * 1. check if the username exists in the db. if exists, return an error
         * 2. salt the password
         * 3. store user details into db
         */
        return false;
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
