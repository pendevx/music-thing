using Microsoft.AspNetCore.Mvc;
using Music.Backend.Models.DTO.Http;
using Music.Backend.Services.Contracts;

namespace Music.Backend.Controllers.Accounts;

[ApiController]
[Route("accounts")]
public class UnauthenticatedAccountsController : BaseController
{
    private readonly IAuthenticationService _authenticationService;

    public UnauthenticatedAccountsController(IAuthenticationService authenticationService)
    {
        _authenticationService = authenticationService;
    }

    [HttpPost]
    [Route("register")]
    public ActionResult<UserInformation> Register(UserRegistrationInfo userInformation)
    {
        var successfullyRegistered = _authenticationService.Register(
            userInformation.Username,
            userInformation.Password,
            userInformation.DisplayName);

        if (!successfullyRegistered)
        {
            Response.StatusCode = 409;
            return null!;
        }

        return Login(new UserLoginInfo(userInformation.Username, userInformation.Password));
    }

    [HttpPost]
    [Route("login")]
    public ActionResult<UserInformation> Login(UserLoginInfo credentials)
    {
        var newAuthCookie = _authenticationService.Login(credentials.Username, credentials.Password);
        AuthenticationCookie = newAuthCookie;

        var account = _authenticationService.GetByUsername(credentials.Username)!;

        return new UserInformation
        {
            DisplayName = account.DisplayName
        };
    }
}
