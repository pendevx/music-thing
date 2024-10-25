using Microsoft.AspNetCore.Mvc;
using Music.Backend.Attributes;
using Music.Backend.Models.DTO.Http;
using Music.Backend.Services.Contracts;

namespace Music.Backend.Controllers.Accounts;

[ApiController]
[Route("accounts")]
[RequiresAuthenticated]
public class AuthenticatedAccountsController : BaseController
{
    private readonly IAuthenticationService _authenticationService;

    public AuthenticatedAccountsController(IAuthenticationService authenticationService)
    {
        _authenticationService = authenticationService;
    }

    [HttpPost]
    [Route("logout")]
    public void Logout()
    {
        _authenticationService.Logout(AuthenticationCookie);
        AuthenticationCookie = Guid.Empty;
    }

    [HttpPost]
    [Route("extendsession")]
    public void ExtendSession()
    {
        // store it so we can re-set the token to the same value after, but with a new max-age
        var cookieGuid = AuthenticationCookie;

        _authenticationService.ExtendSession(AuthenticationCookie, (int)TimeSpan.FromDays(7).TotalSeconds);
        AuthenticationCookie = cookieGuid;
    }

    [HttpGet]
    [Route("user")]
    public ActionResult<UserInformation> GetUserInformation()
    {
        var account = _authenticationService.GetByToken(AuthenticationCookie)!;

        return new UserInformation
        {
            DisplayName = account.DisplayName
        };
    }
}
