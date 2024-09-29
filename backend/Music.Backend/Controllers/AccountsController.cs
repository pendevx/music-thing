using Microsoft.AspNetCore.Mvc;
using Music.Backend.Models.DTO.HttpRequests;
using Music.Backend.Services.Contracts;

namespace Music.Backend.Controllers;

[ApiController]
[Route("accounts")]
public class AccountsController : ControllerBase
{
    private const string AuthorizationCookie = "Authorization";

    private readonly IAuthenticationService _authenticationService;

    public AccountsController(IAuthenticationService authenticationService)
    {
        _authenticationService = authenticationService;
    }

    [HttpPost]
    [Route("register")]
    public void Register(UserRegistrationInfo userInformation)
    {
        var successfullyRegistered = _authenticationService.Register(
            userInformation.Username,
            userInformation.Password,
            userInformation.DisplayName);

        if (!successfullyRegistered)
        {
            Response.StatusCode = 409;
            return;
        }

        Login(new UserLoginInfo(userInformation.Username, userInformation.Password));
    }

    [HttpPost]
    [Route("login")]
    public void Login(UserLoginInfo credentials)
    {
        var authorizationCookie = Request.Cookies[AuthorizationCookie];

        if (authorizationCookie is not null)
        {
            var isActive = _authenticationService.TokenIsActive(Guid.Parse(authorizationCookie));
            if (isActive) return;
        }

        var newAuthCookie = _authenticationService.Login(credentials.Username, credentials.Password);
        Response.Cookies.Append(AuthorizationCookie, newAuthCookie, new CookieOptions
        {
            HttpOnly = true,
            Secure = true,
            SameSite = SameSiteMode.Strict
        });
    }
}
