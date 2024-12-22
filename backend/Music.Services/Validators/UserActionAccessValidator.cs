using System.Security.Authentication;
using Music.Global.Contracts;
using Music.Repository.EF.DatabaseContexts;
using Music.Repository.EF.Models.Generated;

namespace Music.Services.Validators;

public class UserActionAccessValidator
{
    private readonly MusicContext _dbContext;
    private readonly IAuthContext _authContext;

    public UserActionAccessValidator(MusicContext dbContext, IAuthContext authContext)
    {
        _dbContext = dbContext;
        _authContext = authContext;
    }

    public void CheckCurrentAccountHasRole(Role role)
    {
        var account = _authContext.GetAccount();

        if (account is null)
            throw new AuthenticationException("not logged in");

        var isPermitted = _dbContext.AccountRoles.Any(ar => ar.AccountId == account.Id && ar.RoleId == role.Id);

        if (!isPermitted)
            throw new AuthenticationException("not allowed");
    }
}
